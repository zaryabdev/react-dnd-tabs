import React, { useEffect, useReducer } from "react";
import Card from "./Card";
import "./styles.css";

const TOTAL_ITEMS = 5;

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
    const handleItemSelection = () => {};

    return (
        <main>
            <div className="container">
                {state.cards.map((currentCard, currentCardIndex) => {
                    return (
                        <Card key={currentCard.id} color={currentCard.color} />
                    );
                })}
            </div>
        </main>
    );
}
