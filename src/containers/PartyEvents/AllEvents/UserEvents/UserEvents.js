import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import AllEventsPage from '../../../../components/EventSwitcher/AllEventsPage/AllEventsPage';

class UserEvents extends Component {
  componentDidMount() {
    this.props.onSingleEventReset();
    this.props.onCreateEventReset();
    if (localStorage.getItem('token')) {
      this.props.onFetchUserEvents();
    } else {
      this.props.history.push({
        pathname: '/login'
      });
    }
  }

  eventSelectedHandler = (id, eventType) => {
    return this.props.history.push({
      pathname: '/events/eventForUser',
      state: { eventId: id }
    });
  };

  render() {
    let userEvents = <Spinner />;

    if (this.props.userEvents) {
      userEvents = this.props.userEvents.map(event => {
        if (event.creatorId !== this.props.userId) {
          return (
            <AllEventsPage
              key={event._id}
              eventInfo={event}
              clicked={() => this.eventSelectedHandler(event._id)}
            />
          );
        }
      });
    }
    return <div>{userEvents}</div>;
  }
}

const mapStateToProps = state => ({
  loading: state.party.loading,
  userEvents: state.party.userEvents,
  isAuth: state.auth.token !== null,
  userId: state.auth.userId

});

const mapDispatchToProps = dispatch => {
  return {
    onFetchUserEvents: () => dispatch(actions.fetchUserEvents()),
    onSingleEventReset: () => dispatch(actions.singleEventReset()),
    onCreateEventReset: () => dispatch(actions.createEventReset())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserEvents);
