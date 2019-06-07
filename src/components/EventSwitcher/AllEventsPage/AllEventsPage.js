import React from 'react';
import classes from './AllEventPage.module.css';
import Aux from '../../../hoc/Auxillary/Auxillary';

const allEventsPage = props => {
  let eventUsers = null;
  // if(props.showUserInfo){
  //   eventUsers = props.eventInfo.eventUsers.map(event => (
  //     <EventUserInfo showUserInfo={props.showUserInfo} key={event.userId} usersInfo={event} />
  //   ));
  // }
  
  // {props.eventInfo.eventFoodChoice} -{' '}
  return (
    <div className={classes.AllEventsPageWrapper} onClick={props.clicked}>
      <h2>
        {props.eventInfo.title} - {new Date(props.eventInfo.date).toLocaleDateString("he-He")}{' - '} 
         {new Date(props.eventInfo.date).toLocaleTimeString("he-He")}
      </h2>
      <p>Creator: {props.eventInfo.nickname}</p>
      <div className={classes.AllEventsPageInside}>
       {props.showUserInfo ? <Aux> {eventUsers} </Aux> : null}
      </div>
    </div>
  );
};

export default allEventsPage;
