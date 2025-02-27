import React from 'react'

const LocationSearchPanel = (props) => {
    const locationArray = [
        "Sls Boys Hostel Addaguta,Pragathi Nagar Road,Kukatpally",
        "Gokaraju Rangaraju institute of Engineering and Technology",
        "VNR Vjiet institute of Engineering and Technology",
        "Tastea Coffee Addaguta, Pragathi Nagar Road"
    ]
    return (
        <div>
            {locationArray.map((element,index)=>{
                return <div key={index} onClick={()=>{
                    props.setPanelOpen(false)
                    props.setVehiclePanel(true)
                }} className='flex items-center gap-3 p-3 rounded-xl bg-white my-1 border-gray-100 border-2 active:border-black'>
                <i className="ri-map-pin-2-fill text-xl bg-gray-200 rounded-full p-2"></i>
                <h3 className='text-lg ' >{element}</h3>
            </div>
            })}
        </div>
    )
}

export default LocationSearchPanel