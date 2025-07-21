"use client"
import Image from "@/components/Image";
import { useRouter } from "next/navigation";

const page = () => {
    const router = useRouter()

    const closeModal = ()=> {
        router.back()
    }
	return (

		<div className="absolute w-screen h-screen top-0 left-0 z-20 bg-[#293139a6] flex justify-center">
            <div className="py-4 px-8 rounded-xl bg-black w-[600px] h-max mt-12">
                <div>
                    <div className="cursor-pointer font-bold" onClick={closeModal}>X</div>
                    <div>Drafts</div>
                </div>
                <div>
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                        <Image path="general/avatar.png" alt="" width={100} height={100} tr={true}/>
                    </div>
                    <input type="text" placeholder="What is happening?!" />
                </div>
                <div>
                    <div></div>
                    <button>Post</button>
                </div>
            </div>
        </div>
	);
};

export default page;
