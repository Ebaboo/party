import React, { Component } from "react";
import classes from "./CreatorChoicesCards.module.css";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions/index";
import CreatorChoiceCards from "../../../../components/EventSwitcher/userChoiceCards/userChoiceCards";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import Aux from "../../../../hoc/Auxillary/Auxillary";
import InsideCreatorMenu from "../../../../hoc/InsideCreatorMenu/InsideCreatorMenu";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

class CreatorChoicesCards extends Component {
  componentDidMount() {
    if (!this.props.event && localStorage.getItem("eventId")) {
      this.props.onFetchSingleUserEvent(localStorage.getItem("eventId"));
    }
    if (!localStorage.getItem("eventId")) {
      this.props.history.push({
        pathname: "/events"
      });
    }
  }

  onUpdate = (userChoice, choiceLocationId, type) => {
    let convertedType = null;
    switch (type) {
      case "foodChoices":
        convertedType = "foodIngredients";
        break;
      case "drinksChoices":
        convertedType = "drinkIngredients";
        break;
      default:
        return null;
    }

    return this.props.history.push({
      pathname: "/events/eventForCreator/updateCreatorChoice",
      state: {
        choiceType: type,
        type: convertedType,
        userChoice: userChoice,
        choiceLocationId: choiceLocationId,
        eventId: this.props.event._id,
        ings: this.props.event[convertedType]
      }
    });
  };

  onDelete = (locationId, choiceId, type) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className={classes.ConfirmDialogue}>
            <h2>Did you think well?</h2>
            <button
              onClick={() => {
                const choicesById = this.props.event.users.find(
                  user => user._id === locationId
                );
                choicesById[type].map((choice, index) => {
                  if (choice._id === choiceId) {
                    choicesById[type].splice(index, 1);
                  }
                  return choicesById[type];
                });
                const updatedChoices = choicesById[type];
                this.props.onUpdateUserChoice(
                  updatedChoices,
                  type,
                  locationId,
                  this.props.event._id
                );
                onClose();
              }}
            >
              Yes, Delete it!
            </button>
            <button onClick={onClose}>No</button>
          </div>
        );
      }
    });
  };

  render() {
    let foodCards = null;
    let drinksCards = null;
    let choicesAmount = null;

    if (this.props.event) {
      const user = this.props.event.users.find(
        user => user.user._id === this.props.userId
      );

      choicesAmount = user.foodChoices.length + user.drinksChoices.length;

      foodCards = (
        <CreatorChoiceCards
          user={user}
          choiceType="foodChoices"
          onDelete={this.onDelete}
          clicked={this.onUpdate}
        />
      );
      drinksCards = (
        <CreatorChoiceCards
          user={user}
          choiceType="drinksChoices"
          onDelete={this.onDelete}
          clicked={this.onUpdate}
        />
      );
    }

    const allCards = (
      <Aux>
        {foodCards}
        {drinksCards}
      </Aux>
    );

    return (
      <InsideCreatorMenu choicesAmount={choicesAmount}>
        <div className={classes.UserCardsWrapper}>
          {this.props.loading ? <Spinner /> : allCards}
        </div>
      </InsideCreatorMenu>
    );
  }
}

const mapStateToProps = state => ({
  event: state.singleEvent.event,
  userId: state.auth.userId,
  loading: state.singleEvent.loading
});

const mapDispatchToProps = dispatch => {
  return {
    onFetchSingleUserEvent: eventId =>
      dispatch(actions.fetchSingleUserEvent(eventId)),
    onUpdateUserChoice: (updatedChoices, type, choiceLocationId, eventId) =>
      dispatch(
        actions.updateUserChoice(
          updatedChoices,
          type,
          choiceLocationId,
          eventId
        )
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatorChoicesCards);
