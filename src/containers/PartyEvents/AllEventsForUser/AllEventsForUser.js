import React, { Component } from "react";
import { connect } from "react-redux";
import AllEventsPage from "../../components/EventSwitcher/AllEventsPage/AllEventsPage";
import { Redirect } from "react-router-dom";

import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

class AllEventsForUser extends Component {
  componentDidMount() {

    this.props.onSingleEventReset();
    if (localStorage.getItem("token")) {
      this.props.onFetchUserEvents();
    }
  }

  eventSelectedHandler = (id, eventType) => {
    this.props.history.push({
      pathname: "/events/eventForUser",
      state: { eventId: id, eventType: eventType }
    });
  };

  render() {
    if (!localStorage.getItem("token")) {
      return <Redirect to="/login" />;
    }
    let userEvents = <Spinner />;

    if (this.props.userEvents) {
      userEvents = this.props.userEvents.map(event => {
        console.log(event.creatorId !== this.props.userId)
        if (event.creatorId === this.props.userId) {
          userEvents =  (
            <AllEventsPage
              key={event._id}
              eventInfo={event}
              clicked={() => this.eventSelectedHandler(event._id)}
            />
          );
        }
        return userEvents;
      });
    }

    return (
      <div>
        <h3>user Events</h3>
        {userEvents}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.party.loading,
  createdEvents: state.party.createdEvents,
  userEvents: state.party.userEvents,
  isAuth: state.auth.token !== null,
  userId: state.auth.userId
});

const mapDispatchToProps = dispatch => {
  return {
    onFetchUserEvents: () => dispatch(actions.fetchUserEvents()),
    onSingleEventReset: () => dispatch(actions.singleEventReset())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllEventsForUser);
