import update from "immutability-helper";
import { memo, useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes.jsx";
import { Tab } from "./Tab.jsx";


const ITEMS = [
    {
        id: 1,
        text: "Title 1",
    },
    {
        id: 2,
        text: "Title 2",
    },
    {
        id: 3,
        text: "Title 3",
    },
];
export const Container = memo(function Container() {
    const [cards, setCards] = useState(ITEMS);
    const [selectedCard, setSelectedCard] = useState({});

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

    const removeCard = useCallback(
        (originalIndex) => {
            debugger;
            console.log(originalIndex);

            let x = [...cards];

            x.slice(originalIndex, originalIndex + 1);

            console.log(x);
            // setCards(x);

        },
        [cards, setCards]
    );

    const addCard = () => {
        let tempArr = [...cards];
        tempArr.push({
            id: tempArr.length + 1,
            text: `Title ${tempArr.length + 1}`,
        },);
        setCards(tempArr);
    };
    const [, drop] = useDrop(() => ({ accept: ItemTypes.CARD }));

    return (
        <div className="container-fluid">
            <div className="d-flex flex-row justify-content-start align-items-start w-100" ref={drop}>
                {cards.map((card) => (
                    <Tab
                        key={card.id}
                        id={`${card.id}`}
                        text={card.text}
                        card={card}
                        selectedCard={selectedCard}
                        moveCard={moveCard}
                        findCard={findCard}
                        removeCard={removeCard}
                        setSelectedCard={setSelectedCard}
                    >
                        <div>Child {card.text}</div>
                    </Tab>
                ))}
                <div className="align-self-stretch mx-1 p-2 mx-1 bg-dark text-light" onClick={addCard}>
                    <span className="ms-3">+</span>
                </div>
            </div>
        </div>


    );
});
