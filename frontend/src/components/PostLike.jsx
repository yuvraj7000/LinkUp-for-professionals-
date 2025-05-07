import { useState } from "react";
import { ThumbsUp } from "lucide-react";

export default function PostLike({ isLiked, count, onClick }) {
    const [isLikedState, setIsLikedState] = useState(isLiked);
    const [countState, setCountState] = useState(count);
    const onCClick = () => {
        onClick();


        setIsLikedState(!isLikedState);
        setCountState(isLikedState ? countState - 1 : countState + 1);
    };
	return (
		<button className='flex items-center' onClick={onCClick}>
			<span className='mr-1'>
                <ThumbsUp size={18} className={isLikedState ? "text-blue-500  fill-blue-300" : ""} />
            </span>
			<span className=' text-black hidden sm:inline'>{`Like (${countState})`}</span>
		</button>
	);
}