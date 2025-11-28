const skeletonArray = new Array(10)
    .fill(1)
    .map(() => (
        <div className="w-full h-[300px] rounded-md skeleton-gallery-animation" />
    ))

export default function GallerySkeleton({}){
    return <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
        {skeletonArray}
    </div>
}