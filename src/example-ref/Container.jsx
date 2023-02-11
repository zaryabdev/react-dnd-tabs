import React, { memo, useCallback, useReducer, useState } from "react";
import Card from './Card';
import './styles.css';
const log = data => console.log(data);

const TOTAL_ITEMS = 10;


const init_cards = [...Array(TOTAL_ITEMS).keys()].map(i => {
    let obj = {
        id: i + 1,
        order: i,
        url: "https://picsum.photos/40/25?random&" + i
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
    isDragging: false

};

const cardReducer = (state, action) => {
    switch (action.type) {
        case 'CLEAR_SELECTION':
            return {
                ...state,
                selectedCards: init_state.selectedCards,
                lastSelectedIndex: init_state.lastSelectedIndex
            };
        default:
            throw new Error();
    }
};


export const Container = memo(function Container() {

    const [state, dispatch] = useReducer(cardReducer, init_state);

    const clearItemSelection = () => {
        dispatch({ type: "CLEAR_SELECTION" });
    };

    return (
        <div className="">
            {
                state.cards.map((card, cardIndex) => {
                    return <Card
                        key={`card-${card.id}`}
                        id={card.id}
                        url={card.url}
                    />;
                })
            }
        </div>
    );
});
