/* eslint-disable react/prop-types */
import { AiOutlineHeart } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import styles from "../../styles/style";
import { IoIosArrowForward } from "react-icons/io";
import { shallow } from "zustand/shallow";
import { userStore } from "../../store/userStore";

export default function MobileSideBar( {open, setOpenWishlist, setOpen, wishlist, searchTerm, handleSearchChange, searchData, activeHeading} ) {

    const { user, isAuthenticated } = userStore(
        (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
        shallow
      )
    return <div
        className={ `fixed w-full bg-[#0000005f] z-20 h-full top-0 ${ open ? 'left-0' : '-left-full' }` }
    >
        <div className={ `fixed w-[70%] bg-[#fff] h-screen top-0 z-10 overflow-y-scroll transition-all duration-500 delay-75 ${ open ? 'left-0' : '-left-full' }` }>
            <div className="w-full justify-between flex pr-3">
                <div>
                    <div
                        className="relative mr-[15px]"
                        onClick={ () => setOpenWishlist( true ) || setOpen( false ) }
                    >
                        <AiOutlineHeart size={ 30 } className="mt-5 ml-3" />
                        <span className="absolute right-0 top-0 rounded-full bg-[gray] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                            { wishlist && wishlist.length }
                        </span>
                    </div>
                </div>
                <RxCross1
                    size={ 30 }
                    className="ml-4 mt-5"
                    onClick={ () => setOpen( false ) } />
            </div>

            <div className="my-8 w-[92%] m-auto h-[40px relative]">
                <input
                    type="search"
                    placeholder="Search Product..."
                    className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                    value={ searchTerm }
                    onChange={ handleSearchChange } />
                { searchData && searchTerm && (
                    <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3">
                        { searchData.map( ( i, index ) => {
                           
                            return (
                                <Link to={ `/product/${ i._id }` } key={ index }>
                                    <div className="flex items-center">
                                        <img
                                            src={`${i.images[0]?.url}`}
                                            alt=""
                                            className="w-[50px] mr-2" />
                                        <h5>{ i.name }</h5>
                                    </div>
                                </Link>
                            );
                        } ) }
                    </div>
                ) }
            </div>

            <Navbar active={ activeHeading } />
            <div className={ `${ styles.button } ml-4 !rounded-[4px]` }>
                <Link to="/shop-create">
                    <h1 className="text-[#fff] flex items-center">
                        Become Seller <IoIosArrowForward className="ml-1" />
                    </h1>
                </Link>
            </div>
            <br />
            <br />
            <br />

            <div className="flex w-full justify-center">
                { isAuthenticated ? (
                    <div>
                        <Link to="/profile">
                            <img
                                src={ `${user?.avatar?.url}` }
                                alt=""
                                className="w-[60px] h-[60px] rounded-full border-[3px] border-[#0eae88]" />
                        </Link>
                    </div>
                ) : (
                    <>
                        <Link
                            to="/login"
                            className="text-[18px] pr-[10px] text-[#000000b7]"
                        >
                            Login /
                        </Link>
                        <Link
                            to="/sign-up"
                            className="text-[18px] text-[#000000b7]"
                        >
                            Sign up
                        </Link>
                    </>
                ) }
            </div>
        </div>
    </div>;
}