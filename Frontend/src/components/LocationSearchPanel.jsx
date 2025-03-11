import React, { useEffect } from 'react'

const LocationSearchPanel = (props) => {

    const locationArray = props.locationSuggestions.map(element => element.structured_formatting)
    locationArray.splice(5);
    return (
        <div className='m-3'>
            {locationArray.map((element, index) => {
                return <div key={index} onClick={() => {

                    if (props.pickupData) {
                        props.setPickup(`${element.main_text} ${element.secondary_text}`);
                        props.setPickupDescription({
                            main_text: element.main_text,
                            secondary_text: element.secondary_text
                        });
                        if (!props.destination) {
                            props.setPickupData(false);
                            props.inputDestinationRef.current.focus();
                        }
                    } else {
                        props.setDestination(`${element.main_text} ${element.secondary_text}`);
                        props.setDestinationDescription({
                            main_text: element.main_text,
                            secondary_text: element.secondary_text
                        });
                        if (!props.pickup) {
                            props.setPickupData(true);
                            props.inputPickupRef.current.focus();
                        }
                    }
                }} className='flex items-center gap-3 p-1 rounded-xl bg-white my-1 border-gray-100 border-2 active:border-black'>
                    <i className="ri-map-pin-2-fill text-xl bg-gray-200 rounded-full p-2"></i>
                    <div>
                        <h3 className='text-base font-normal ' >{element.main_text}</h3>
                        <h4 className='text-sm font-normal ' >{element.secondary_text}</h4>
                    </div>
                </div>
            })}
        </div>
    )
}

export default LocationSearchPanel