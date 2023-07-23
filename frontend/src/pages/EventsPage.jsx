import React from "react";
import { userStore } from "../store/userStore";
import Loader from "../components/layout/Loader";
import EventCard from "../components/Home/EventCard";
import { productData } from "../static/data";
import { useEventStore } from "../store/useEventStore";
import { shallow } from "zustand/shallow";

const EventsPage = () => {
  const { allEvents, loading } = useEventStore(
    (state) => ({allEvents: state.allEvents, loading:state.loading }),
    shallow
  )

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
         {allEvents.map((e, i) => (
           <EventCard active={ true } data={ e } key={ i } />
         ))}
         
        </div>
      )}
    </>
  );
};

export default EventsPage;