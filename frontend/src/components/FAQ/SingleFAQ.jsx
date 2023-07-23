/* eslint-disable react/prop-types */
export default function SingleFAQ( {toggleTab, activeTab, num, answer, question}) {

    return <div className="border-b border-gray-200 pb-4 ">
        <button
            className="flex items-center justify-between w-full"
            onClick={ () => toggleTab( num ) }
        >
            <span className="text-[1.3rem] md:text-[1.4rem] font-medium text-gray-900">
                {question}
            </span>
            { activeTab === num ? (
                <svg
                    className="h-6 w-6 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={ 2 }
                        d="M6 18L18 6M6 6l12 12" />
                </svg>
            ) : (
                <svg
                    className="h-6 w-6 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={ 2 }
                        d="M9 5l7 7-7 7" />
                </svg>
            ) }
        </button>
        {/* { activeTab === num && ( */}
            <div className={`mt-4 h-0 transition-all duration-500 ${activeTab === num && 'h-[130px] sm:h-[120px] md:h-[100px]'} overflow-hidden`}>
                <p className="text-[1.1rem] md:text-[1.2rem] text-gray-500">
                    { answer}
                </p>
            </div>
      
    </div>;
}