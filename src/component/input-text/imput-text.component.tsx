require('es6-promise').polyfill();

import React, { Component } from 'react';
import axios from 'axios';
import './imput-text.component.css';
import appConstans from '../../appConstants';

class InputText extends Component<IInputTextProps, IInputTextState> {
    constructor(props: any) {
        super(props);
        this.state = { input: '', data: []}
    }

    onChange(event: any) {
        const { value } = event.target;
        //search
        if (value &&value.length > 1){
             axios.get(`https://cors.io/?https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=6&solrTerm=${value}`).then(response =>{
                console.log('data', response);
                this.setState({ data: response.data.results.docs, input: value });
            })
        } else{
            this.setState({ data: [], input: value });

        }
    }

    getPlaceTypeName(placeType: string) {
        switch (placeType) {
            case appConstans.placeType.airport.id:
                return appConstans.placeType.airport.name;
            case appConstans.placeType.city.id:
                return appConstans.placeType.city.name;
            case appConstans.placeType.station.id:
                return appConstans.placeType.station.name;

            default:
                return appConstans.placeType.defalut.name
        }
    }

    getLocationLabel(location: any){
        let text = '';
        text += location.region ? location.region : '';
        text += location.country ? (text ? ', ' + location.country : location.country ) : '';
        return text;

    }

    getLocationInfo(location: any, key: number) {
        if(location.placeKey){
            return (
                <div key={key} style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'white', borderBottomColor: 'black' }}>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, margin: 10, height: 20, width: 100, backgroundColor: 'red', alignItems: 'center' }}>
                            {this.getPlaceTypeName(location.placeType)}
                        </div>
                    </div>
                    <div style={{ flex: 4, color: 'black', flexDirection: 'column', textAlign: 'left' }}>
                        <p style={{ fontSize: 13, margin: 0, alignContent: 'left', alignItems: 'left' }}>
                            {location.name}
                        </p>
                        <p style={{ fontSize: 13, margin: 0, alignContent: 'left', alignItems: 'left' }}>
                            {this.getLocationLabel(location)}
                        </p>
                    </div>
                </div>
            )
        }
        else{
            return (
                <div key={key} style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'white', borderBottomColor: 'black', padding: '12px' }}>
                    <div style={{ flex: 1, color: 'black', flexDirection: 'column', textAlign: 'left' }}>
                        <p style={{ fontSize: 13, margin: 0, alignContent: 'left', alignItems: 'left' }}>
                            {location.name}
                        </p>
                    </div>
                </div>
            )
        }
        
    }

    render() {
        return (
            <div className="InputText-main">
                <p className="InputText-title">Pick-up Location</p>
                <div className="InputText-container">
                    <input placeholder={'city, airport, station, region, district...'} className="InputText-input" type="text" name="direction-input" onChange={this.onChange.bind(this)} />

                    {this.state.input && this.state.input.length > 1 && this.state.data && this.state.data.map((location: any, key: number) => {
                        return (
                            this.getLocationInfo(location, key)
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default InputText;

export interface IInputTextProps {

}

export interface IInputTextState {
    input?: string;
    data?:any;
}