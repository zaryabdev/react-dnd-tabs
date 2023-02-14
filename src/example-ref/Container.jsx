import React, {
    memo,
    useCallback,
    useEffect,
    useReducer,
    useState,
} from "react";
import Card from "./Card";
import "./styles.css";
const log = (data) => console.log(data);

const TOTAL_ITEMS = 8;

const init_cards = [...Array(TOTAL_ITEMS).keys()].map((i) => {
    let obj = {
        id: i + 1,
        order: i,
        url: "https://picsum.photos/80/45?random&" + i,
        color: Math.floor(Math.random() * 16777215).toString(16),
    };

    return obj;
});

const init_state = {
    cards: init_cards,
    selectedCards: [],
    lastSelectedIndex: -1,
    dragIndex: -1,
    hoverIndex: -1,
    insertIndex: -1,
    isDragging: false,
};

const cardReducer = (state, action) => {
    // debugger;
    // log(state);
    // log(action);

    switch (action.type) {
        case "CLEAR_SELECTION":
            return {
                ...state,
                selectedCards: init_state.selectedCards,
                lastSelectedIndex: init_state.lastSelectedIndex,
            };
        case "UPDATE_SELECTION":
            return {
                ...state,
                selectedCards: action.newSelectedCards,
                lastSelectedIndex: action.newLastSelectedIndex,
            };
        case "REARRANGE_CARDS":
            return { ...state };
        case "SET_INSERTINDEX":
            // dragIndex: action.dragIndex,
            // log("INSIDE DISPATCH");
            // log(action.hoverIndex);
            // log(action.insertIndex);
            return {
                ...state,
                hoverIndex: action.hoverIndex,
                insertIndex: action.insertIndex,
            };
        default:
            throw new Error();
    }
};

export const Container = memo(function Container() {
    const [state, dispatch] = useReducer(cardReducer, init_state);

    useEffect(() => {
        log("Global state : " + state.insertIndex);
    }, [state]);

    const clearItemSelection = () => {
        dispatch({ type: "CLEAR_SELECTION" });
    };

    const handleItemSelection = (index, cmdKey, shiftKey) => {
        // debugger;
        let newSelectedCards;
        const cards = state.cards;
        const card = index < 0 ? {} : cards[index];
        const newLastSelectedIndex = index;

        if (!cmdKey && !shiftKey) {
            // log(card);
            // newSelectedCards = [card, {
            //     id: 1,
            //     order: 0,
            //     url: "https://picsum.photos/40/25?random&0"
            // }];
            // newSelectedCards = [card];
        }

        let filteredCards = [];

        // gets selected cards from cards array
        for (let i = 0; i < cards.length; i++) {
            newSelectedCards.forEach((el) => {
                if (cards[i].id === el.id) {
                    filteredCards.push(el);
                }
            });
        }

        // log(filteredCards);

        // let filteredCards = cards.filter(filCard => {
        //     debugger;

        //     let x = newSelectedCards.find(finCard => {
        //         return finCard === filCard;
        //     });

        //     // log(x);
        //     return x ? true : false;

        // });

        // log(filteredCards);
        const finalList = filteredCards ? filteredCards : [];
        log("Update selection called");
        dispatch({
            type: "UPDATE_SELECTION",
            newSelectedCards: finalList,
            newLastSelectedIndex: newLastSelectedIndex,
        });

        // log(state);
    };

    const setInsertIndex = (dragIndex, hoverIndex, newInsertIndex) => {
        // log(state.hoverIndex);
        // log(state.insertIndex);
        // log({ dragIndex, hoverIndex, newInsertIndex });
        // state.dragIndex === dragIndex &&
        if (
            state.hoverIndex === hoverIndex &&
            state.insertIndex === newInsertIndex
        ) {
            return;
        }
        log("GOING TO DISPATCH");
        dispatch({
            type: "SET_INSERTINDEX",
            dragIndex: dragIndex,
            hoverIndex: hoverIndex,
            insertIndex: newInsertIndex,
        });
    };

    const rearrangeCards = (dragItem) => {
        let cards = state.cards.slice();
        const draggedCards = dragItem.cards;

        let dividerIndex;
        debugger;

        log("Inside rearrangeCards" + state.insertIndex);

        if ((state.insertIndex >= 0) & (state.insertIndex < cards.length)) {
            dividerIndex = state.insertIndex;
        } else {
            dividerIndex = cards.length;
        }

        const upperHalfRemainingCards = cards.slice(0, dividerIndex);
        const lowerHalfRemainingCards = cards.slice(dividerIndex);

        log(upperHalfRemainingCards);
        log("----------");
        log(lowerHalfRemainingCards);

        let newCards = [];

        // dispatch({ type: "REARRANGE_CARDS", newCards: newCards });
    };

    return (
        <div className="container">
            {state.cards.map((card, cardIndex) => {
                const inserLineOnLeft =
                    state.hoverIndex === cardIndex &&
                    state.insertIndex === cardIndex;
                // log("inserLineOnLeft : " + inserLineOnLeft);
                const inserLineOnRight =
                    state.hoverIndex === cardIndex &&
                    state.insertIndex === cardIndex + 1;
                // log("inserLineOnRight : " + inserLineOnRight);
                return (
                    <Card
                        key={`card-${card.id}`}
                        id={card.id}
                        url={card.url}
                        index={cardIndex}
                        onSelectionChange={handleItemSelection}
                        selectedCards={state.selectedCards}
                        isSelected={state.selectedCards.includes(card)}
                        inserLineOnLeft={inserLineOnLeft}
                        inserLineOnRight={inserLineOnRight}
                        order={card.order}
                        clearItemSelection={clearItemSelection}
                        color={card.color}
                        setInsertIndex={setInsertIndex}
                        rearrangeCards={rearrangeCards}
                    />
                );
            })}
        </div>
    );
});
