import React from 'react'
import { Cell } from 'react-vant'
import styles from './index.module.scss'

const data: Array<[string, Array<string>]> = [
    ['A', ['Aaron', 'Abigail', 'Adam', 'Alice', 'Amanda', 'Andrew', 'Angela', 'Anna', 'Anthony', 'Arthur']],
    ['B', ['Barbara', 'Benjamin', 'Beth', 'Beverly', 'Brian', 'Brenda', 'Brandon', 'Bruce', 'Bonnie', 'Bradley']],
    ['C', ['Carol', 'Charles', 'Catherine', 'Christopher', 'Cynthia', 'Claire', 'Colin', 'Craig', 'Carl', 'Christine']],
    ['D', ['Daniel', 'David', 'Deborah', 'Derek', 'Diana', 'Donna', 'Dorothy', 'Douglas', 'Donald', 'Denise']],
    ['E', ['Edward', 'Elizabeth', 'Emily', 'Emma', 'Ethan', 'Evan', 'Elaine', 'Eric', 'Evelyn', 'Elliot']],
    ['F', ['Fiona', 'Frank', 'Frederick', 'Frances', 'Faith', 'Felicia', 'Finn', 'Flora', 'Francis', 'Fabian']],
    ['G', ['George', 'Grace', 'Gloria', 'Gregory', 'Graham', 'Gail', 'Gabrielle', 'Gavin', 'Genevieve', 'Gabriel']],
    ['H', ['Heather', 'Helen', 'Henry', 'Hannah', 'Howard', 'Harold', 'Holly', 'Harry', 'Hazel', 'Hugh']],
    ['I', ['Isabella', 'Ian', 'Irene', 'Isaac', 'Ivy', 'Ivan', 'Ingrid', 'Iliana', 'Isaiah', 'Irving']],
    ['J', ['James', 'Jane', 'John', 'Jennifer', 'Jessica', 'Joseph', 'Julia', 'Jacqueline', 'Jason', 'Jacob']],
    ['K', ['Karen', 'Kevin', 'Kimberly', 'Katherine', 'Kyle', 'Keith', 'Kelly', 'Kristin', 'Karl', 'Kenneth']],
    ['L', ['Linda', 'Laura', 'Louis', 'Lisa', 'Lucy', 'Leonard', 'Lawrence', 'Luke', 'Lily', 'Liam']],
    ['M', ['Mary', 'Michael', 'Margaret', 'Matthew', 'Melissa', 'Mark', 'Michelle', 'Monica', 'Martin', 'Mitchell']],
    ['N', ['Nancy', 'Nicholas', 'Nicole', 'Natalie', 'Nathan', 'Naomi', 'Neil', 'Nina', 'Norman', 'Noel']],
    ['O', ['Olivia', 'Oliver', 'Ophelia', 'Owen', 'Oscar', 'Orville', 'Olive', 'Otto', 'Octavia', 'Odessa']],
    ['P', ['Patricia', 'Paul', 'Pamela', 'Peter', 'Philip', 'Peggy', 'Phoebe', 'Patrick', 'Perry', 'Paula']],
    ['Q', ['Quinn', 'Quentin', 'Quincy', 'Queen', 'Querida', 'Quinton', 'Quiana', 'Quinn', 'Quinten', 'Quintin']],
    ['R', ['Rachel', 'Robert', 'Rebecca', 'Richard', 'Rose', 'Ronald', 'Ryan', 'Rita', 'Regina', 'Raymond']],
    ['S', ['Susan', 'Samuel', 'Sandra', 'Steven', 'Sarah', 'Scott', 'Stephanie', 'Simon', 'Samantha', 'Sean']],
    ['T', ['Theresa', 'Thomas', 'Tracy', 'Timothy', 'Tiffany', 'Tina', 'Theodore', 'Terry', 'Tabitha', 'Tristan']],
    ['U', ['Ursula', 'Ulysses', 'Una', 'Urban', 'Ulrich', 'Unity', 'Uriel', 'Umber', 'Upton', 'Ula']],
    ['V', ['Victoria', 'Vincent', 'Valerie', 'Victor', 'Vanessa', 'Vernon', 'Vivian', 'Vance', 'Veronica', 'Vaughn']],
    ['W', ['Wendy', 'William', 'Willow', 'Walter', 'Winifred', 'Wayne', 'Willa', 'Warren', 'Whitney', 'Wesley']],
    ['X', ['Xena', 'Xavier', 'Ximena', 'Xander', 'Xiomara', 'Xerxes', 'Xochitl', 'Xavian', 'Xavion', 'Xia']],
    ['Y', ['Yvonne', 'Yusuf', 'Yasmine', 'Yahir', 'Yasmin', 'Yehuda', 'Yosef', 'Yolanda', 'Yara', 'Yannick']],
    ['Z', ['Zoe', 'Zachary', 'Zane', 'Zara', 'Zeke', 'Zelda', 'Zinnia', 'Zander', 'Zephyr', 'Zena']]
]

const CategoryStyle: React.FC = () => {
    return (
        <div className={`page ${styles.container}`}>
            {data.map(([category, names], idx) => (
                <div key={idx}>
                    <Cell className={styles.category}>{category}</Cell>
                    <Cell>
                        {names.map((name, index) => (
                            <Cell key={index}>{name}</Cell>
                        ))}
                    </Cell>
                </div>
            ))}
        </div>
    )
}

export const Component = CategoryStyle
