export default function TaskLoadSkeletonPage() {
    const datas = [1, 2, 3, 4, 5, 6, 7, 8]
    const items = datas.map((task) => {
        return (
            <div className="skeleton h-32"></div>
        )
    })
    return (
        <div>
            <div className="flex justify-between py-4">
                <div className="">
                    <div className=" space-y-4">
                        <p className="h-6 skeleton w-20"></p>
                        <p className="h-4 skeleton w-40"></p>
                    </div>
                </div>
                <div className="btn skeleton w-20"></div>
            </div>
            <div className='grid lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                {items}
            </div>

        </div>
    )
}