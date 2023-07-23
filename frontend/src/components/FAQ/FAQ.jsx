import { useState } from "react";
import styles from "../../styles/style";
import SingleFAQ from "./SingleFAQ";
import { faqData } from "../../static/FAQData";

const FAQ = () => {
    const [activeTab, setActiveTab] = useState(0);
  
    const toggleTab = (tab) => {
      if (activeTab === tab) {
        setActiveTab(0);
      } else {
        setActiveTab(tab);
      }
    };
  
    return (
      <div className={`${styles.section} my-8 lg:w-9/12 mx-auto`}>
        <h2 className="text-3xl font-bold text-gray-900 mb-8">FAQ</h2>
        <div className="mx-auto space-y-4">
         
          {
            faqData.map(faq => (
                <SingleFAQ toggleTab={(tab)=> toggleTab(tab) } activeTab={ activeTab } num={ faq.id } key={ faq.id } question={ faq.question } answer={ faq.answer } /> 
            ))
          }
  
        </div>
      </div>
    );
  };

  export default FAQ

