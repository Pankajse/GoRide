import React from 'react'

const CaptainDetails = () => {
    return (
        <div>
            <div className='p-4 rounded-2xl absolute bottom-0 bg-white w-full'>

                <div className='flex justify-between items-center py-2 my-3'>
                    <div>
                        <img className='w-16 h-16 object-cover rounded-full' src="https://th.bing.com/th/id/R.106b752bda82545d3c70972dbfe74281?rik=iwLSNYal12Y9TA&riu=http%3a%2f%2fblogs.timesofindia.indiatimes.com%2fwp-content%2fuploads%2f2015%2f04%2fRahul-Gandhi.jpg&ehk=0si1oTzAHgpbGJ6CI9%2f7WlSb9hDPYQmQ8bIeijpxe74%3d&risl=&pid=ImgRaw&r=0" alt="" />
                        <h3 className='text-2xl font-medium '>Rahul Gandhi</h3>
                    </div>

                    <div>
                        <h4 className='text-xl font-semibold'>₹625.17</h4>
                        <h5 className='text-base font-normal text-gray-600'>Earned</h5>
                    </div>
                </div>
                <hr />

                <div className='bg-[#ffc804] p-4 rounded-lg flex items-center justify-between my-4'>
                    <div className='text-center'>
                        <i className="ri-time-line text-lg font-medium"></i>
                        <h3 className='text-xl font-medium'>10.3</h3>
                        <p className='text-sm font-medium text-gray-600'>HOURS ONLINE</p>
                    </div>

                    <div className='text-center'>
                        <i className="ri-speed-up-line text-lg font-medium"></i>
                        <h3 className='text-xl font-medium'>23km</h3>
                        <p className='text-sm font-medium text-gray-600'>TOTAL DISTANCE</p>
                    </div>

                    <div className='text-center'>
                        <i className="ri-riding-line text-lg font-medium"></i>
                        <h3 className='text-xl font-medium'>20</h3>
                        <p className='text-sm font-medium text-gray-600'>RIDES</p>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default CaptainDetails