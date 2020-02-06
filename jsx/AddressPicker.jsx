import Card, {
    CardPrimaryContent,
  } from "@material/react-card";

  import {
    Body2,
    Headline6,
  } from '@material/react-typography';

import TextField, {HelperText, Input} from '@material/react-text-field';

import MaterialIcon from '@material/react-material-icon';

import Select, {Option} from '@material/react-select';

class AddressPicker extends React.Component {
    constructor(props) {
        super(props)
        this.cities = Object.keys(this.props.taiwanPostalCodes)
    }
    
    handlerRelated = (name, value) => {
        let mergeObject = {}
        const {taiwanPostalCodes, fullAddress: {city, district, postalCode, address}} = this.props
        if (name == "city" && city != value) {
            mergeObject["district"] = ""
            mergeObject["postalCode"] = ""
        }else if (name == "district" && district != value) {
            const cityData = taiwanPostalCodes[city];
            const postalCode = cityData[value];
            mergeObject["postalCode"] = postalCode
        }
        return mergeObject
    }
    
    onEnhancedChange = (name, index, item) => {
        const value = item.getAttribute("data-value")
        const { fullAddress, handler} = this.props
        const mergeObject = this.handlerRelated(name, value)
        handler("fullAddress", {...fullAddress, ...mergeObject, [name] : value})
    }
    
    inputHandler = (e) => {
        const { name, value } = e.target
        const { fullAddress, handler} = this.props
        const mergeObject = this.handlerRelated(name, value)
        handler("fullAddress", {...fullAddress, ...mergeObject, [name] : value})
    }

    clearAddress = () => {
        const name = "address"
        const value = ""
        const {fullAddress, handler} = this.props
        const mergeObject = this.handlerRelated(name, value)
        handler("fullAddress", {...fullAddress, ...mergeObject, [name] : value})
    }

    getCityOptions = (cities) => {
        return cities.map((city) => {
            return (
                <Option value={city} key={city}>{city}</Option>
            )
         })
    }
    getDistrictOptions = (districts) => {
        return districts.map((district) => {
            return (
                <Option value={district} key={district}>{district}</Option>
            )
           })
    }
    
    render = () => {
        const {taiwanPostalCodes, fullAddress: {city, district, postalCode, address}} = this.props
        const cityOptions = this.getCityOptions(this.cities)
        const cityData = taiwanPostalCodes[city]
        const districts =  Object.keys(cityData)
        const districtOptions = this.getDistrictOptions(districts)
        return(
            <div>
                <Card>
                <CardPrimaryContent>
                <div style={{ padding: "1rem"}}>
                <Select
                    label='City'
                    value={city}
                    onEnhancedChange={this.onEnhancedChange.bind(this, "city")}
                    enhanced
                    outlined
                >
                   {cityOptions} 
                </Select>
                <input type="hidden" name="city" value={city}/>
                <br/>
                <br/>
                <Select
                    label='District'
                    value={district}
                    onEnhancedChange={this.onEnhancedChange.bind(this, "district")}
                    enhanced
                    outlined
                >
                   {districtOptions}
                </Select>
                <input type="hidden" name="district" value={district}/>
               <br />
               <br />
               <TextField
                    outlined
                    label='Zipcode'
                >
                    <Input 
                        type= "text"
                        name="postalCode" 
                        value={postalCode} 
                        disabled={true}
                    />
                </TextField>
                <input type="hidden" name="postalCode" value={postalCode}/>
                <br/>
                <TextField
                    outlined
                    label='Address'
                    helperText={<HelperText>Address</HelperText>}
                    leadingIcon={<MaterialIcon role="button" icon="home"/>}
                    onTrailingIconSelect={this.clearAddress}
                    trailingIcon={<MaterialIcon role="button" icon="delete"/>}
                >
                    <Input
                        type="text"
                        name="address"
                        value={address}
                        onChange={this.inputHandler} />
                    </TextField>  
                </div>
                </CardPrimaryContent>
                </Card>
            </div>
        )
    }
}

export default AddressPicker;