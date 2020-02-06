import Card, {
    CardPrimaryContent,
  } from "@material/react-card";

import {
    Body2,
    Headline6,
  } from '@material/react-typography';

import TextField, {HelperText, Input} from '@material/react-text-field';

import Radio, {NativeRadioControl} from '@material/react-radio';

import Checkbox from '@material/react-checkbox';

class ReceiptType extends React.Component {
   
    componentDidMount = () => {
        document.getElementById("byMail").value = "byMail"
        document.getElementById("promptRegistered").value = "promptRegistered"
    }
    
    inputHandler = (e) => {
        const {name, value} = e.target
        const {receipt, handler} = this.props
        handler("receipt", {...receipt, [name]: value})
    }

    removeValueFromArray  = (array, value) => {
        return array.filter((element) => {
            return element != value
        })
    }
   
    checkboxHandler = (e) => {
        const checkboxParent = e.target.closest(".mdc-checkbox")
        const newValue = e.target.value
        const name = checkboxParent.getAttribute("attributeName")
        const {receipt, handler} = this.props

        let values = receipt[name]
        if(values.includes(newValue)) {
             values = this.removeValueFromArray(values, newValue)
        }else {
            values.push(newValue)
        }

        if(name == "receiptOptions" && !values.includes("byMail")){
            values = []
        }
        handler("receipt", {...receipt, [name]: values})
    }
    

    render = () => {
        console.log("ReceiptType render")
        const {receipt, handler} = this.props
        const {receiptType, taxId, receiptOptions} = receipt
        return(
        <div>
            <Card>
            <CardPrimaryContent>
            <div style={{ padding: "1rem"}}>
            <Headline6 tag="p">Payment</Headline6>
            <Body2 tag="div">
            <div>
                <Radio label="Credit / Debit Card" key="personal">
                    <NativeRadioControl  
                        name="receiptType"  
                        value="2" 
                        id="personal" 
                        onChange={this.inputHandler}
                        checked={receiptType == 2}
                    />
                </Radio> 
                <br />
                <Radio label="PayPal" key="company">
                    <NativeRadioControl 
                        name="receiptType"  
                        value="3" 
                        id="company" 
                        onChange={this.inputHandler}
                        checked={receiptType == 3}
                    /> 
                </Radio>   
            </div>
            <br />
            <br />
            <div>
            <Headline6 tag="p">Shipping Type</Headline6><br />
                <React.Fragment>
                    <Checkbox
                        name="receiptOptions[]" 
                        attributeName="receiptOptions"
                        nativeControlId="byMail" 
                        checked={receiptOptions.includes("byMail")} 
                        onChange={this.checkboxHandler}
                    />
                    <label htmlFor="byMail">Standard Shipping</label>
                </React.Fragment>
                <br />
                <React.Fragment>
                    <Checkbox  
                        name="receiptOptions[]" 
                        attributeName="receiptOptions"
                        nativeControlId="promptRegistered" 
                        checked={receiptOptions.includes("promptRegistered")} 
                        onChange={this.checkboxHandler}
                        disabled = {!receiptOptions.includes("byMail")}
                    />
                    <label htmlFor="promptRegistered">Expedited Shipping + $30</label>                
                </React.Fragment>
            </div>
            </Body2>
            </div>
            </CardPrimaryContent>
            </Card>
        </div>
        )
    }
}

export default ReceiptType;