

import styles from '../../styles/style';
import { productData } from '../../static/data';
import EventCard from './EventCard';
import { useEventStore } from '../../store/useEventStore';
import { shallow } from 'zustand/shallow';

const Events = () => {
  const { allEvents, loading } = useEventStore(
    (state) => ({allEvents: state.allEvents, loading:state.loading }),
    shallow
  )
  
  return (
    <div>
     {
      loading ? (
        <div className={`${styles.section}`}>
      <div className={`${styles.heading}`}>
        <h1>Popular Events</h1>
      </div>

    
     
    </div>
        ) : (
          <div className="w-full grid py-4">
          {
           allEvents.length !== 0 && (
             <EventCard data={allEvents && allEvents[0]} />
           )
          }
        
       </div>
      )
     }
  </div>
  )
}

export default Events