import React, { useEffect, useReducer } from "react";
import Card from "./Card";
import "./styles.css";

const TOTAL_ITEMS = 5;
const log = (data) => console.log(data);
let COLORS = [
    "E8ECF1",
    "B5CFD8",
    "7393A7",
    "F08A5D",
    "790252",
    "FF2E63",
    "00ADB5",
    "393E46",
];

const cardReducer = (state, action) => {
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
        case "SET_INSERTINDEX":
            return {
                ...state,
                dragIndex: action.dragIndex,
                insertIndex: action.newInsertIndex,
                hoverIndex: action.hoverIndex,
            };
        default:
            throw new Error();
    }
};

const init_cards = [...Array(TOTAL_ITEMS).keys()].map((index) => ({
    id: index + 1,
    order: index,
    color: COLORS[generateRandom(0, COLORS.length)],
}));

function generateRandom(min = 0, max = 100) {
    let difference = max - min;
    let rand = Math.random();
    rand = Math.floor(rand * difference);
    rand = rand + min;
    return rand;
}

const init_state = {
    cards: init_cards,
    selectedCards: [],
    lastSelectedIndex: -1,
    dragIndex: -1,
    hoverIndex: -1,
    insertIndex: -1,
    isDragging: false,
};

export function Container() {
    const [state, dispatch] = useReducer(cardReducer, init_state);

    // useEffect(() => {
    //     console.log(state);
    // }, [state]);

    const clearItemSelection = () => {
        dispatch({ type: "CLEAR_SELECTION" });
    };
    const handleItemSelection = (index, cmdKey, shiftKey) => {
        let newSelectedCards;
        const cards = state.cards;
        const card = index < 0 ? {} : cards[index];
        const newLastSelectedIndex = index;

        if (!cmdKey && !shiftKey) {
            newSelectedCards = [card];
        }

        // gets selected cards from cards array

        const finalList = [];

        for (let i = 0; i < cards.length; i++) {
            newSelectedCards.forEach((el) => {
                if (cards[i].id === el.id) {
                    finalList.push(el);
                }
            });
        }

        dispatch({
            type: "UPDATE_SELECTION",
            newSelectedCards: finalList,
            newLastSelectedIndex: newLastSelectedIndex,
        });
    };

    const setInsertIndex = (dragIndex, hoverIndex, newInsertIndex) => {
        log({ dragIndex, hoverIndex, newInsertIndex });

        // TODO: find about that drag index
        if (
            state.hoverIndex === hoverIndex &&
            state.insertIndex === newInsertIndex
        ) {
            return;
        }

        dispatch({
            type: "SET_INSERTINDEX",
            dragIndex,
            hoverIndex,
            insertIndex: newInsertIndex,
        });
    };

    return (
        <main>
            <div className="container">
                {state.cards.map((currentCard, currentCardIndex) => {
                    return (
                        <Card
                            key={currentCard.id}
                            id={currentCard.id}
                            color={currentCard.color}
                            order={currentCard.order}
                            index={currentCardIndex}
                            onSelectionChange={handleItemSelection}
                            selectedCards={state.selectedCards}
                            isSelected={state.selectedCards.includes(
                                currentCard
                            )}
                            clearItemSelection={clearItemSelection}
                            setInsertIndex={setInsertIndex}
                        />
                    );
                })}
            </div>
        </main>
    );
}
