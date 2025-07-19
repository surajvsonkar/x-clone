import Image from './Image'

const Recommendations = () => {
  return (
    <div className='p-4 rounded-2xl border-[1px] border-borderGray flex flex-col gap-4'>
        <div className='flex justify-between items-center'>
            <div className='flex gap-2 items-center'>
                <div className='relative rounded-full overflow-hidden w-10 h-10'>
                    <Image path='general/avatar.png' alt='' width={100} height={100} tr={true}/>
                </div>
                <div>
                    <h1 className='text-md font-bold'>Suraj Sonkar</h1>
                    <span className='text-textGray text-sm'>@msurajhu</span>
                </div>
            </div>
            <button className='py-1 px-4 bg-white text-black font-semibold rounded-full'>Follow</button>
        </div>
    </div>
  )
}

export default Recommendations