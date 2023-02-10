import update from "immutability-helper";
import { memo, useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes.jsx";
import { Tab } from "./Tab.jsx";


const ITEMS = [
    {
        id: 1,
        text: "Write a cool JS library",
    },
    {
        id: 2,
        text: "Make it generic enough",
    },
    {
        id: 3,
        text: "Write README",
    },
];
export const Container = memo(function Container() {
    const [cards, setCards] = useState(ITEMS);
    const findCard = useCallback(
        (id) => {
            const card = cards.filter((c) => `${c.id}` === id)[0];
            return {
                card,
                index: cards.indexOf(card),
            };
        },
        [cards]
    );
    const moveCard = useCallback(
        (id, atIndex) => {
            const { card, index } = findCard(id);
            setCards(
                update(cards, {
                    $splice: [
                        [index, 1],
                        [atIndex, 0, card],
                    ],
                })
            );
        },
        [findCard, cards, setCards]
    );
    const [, drop] = useDrop(() => ({ accept: ItemTypes.CARD }));
    return (
        <div className="d-flex flex-row justify-content-start align-items-start w-100" ref={drop}>
            {cards.map((card) => (
                <Tab
                    key={card.id}
                    id={`${card.id}`}
                    text={card.text}
                    moveCard={moveCard}
                    findCard={findCard}
                />
            ))}
            <div className="align-self-stretch mx-1 p-2 mx-1 bg-dark text-light">
                <span className="ms-3">+</span>
            </div>
        </div>

    );
});
