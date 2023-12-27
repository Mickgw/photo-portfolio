import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "@/app/components/svgs/ArrowUpRight";

export const NavButton = () => {
    return (
        <Link id="nav-button-wrapper" href="/albums" className="hidden">
            <motion.div
                whileTap={{ scale: 0.9 }}
                className="nav-button min-w-[220px] bg-white flex gap-1 items-center justify-center text-black w-fit py-3 text-[20px] px-8 rounded-full border-[1px] border-solid border-black font-semibold hover:bg-black hover:text-white transition-colors duration-300 ease-in-out"
            >
                <span>explore</span>
                <ArrowUpRight className="-mb-[2px]" width={24} height={24} />
            </motion.div>
        </Link>
    );
};
