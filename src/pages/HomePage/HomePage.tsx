import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, ButtonType } from 'react-vant'
import styles from './HomePage.module.scss'
import { ROUTES } from '@/RootComponent'
import DateDisplay from '@/components/DateDisplay'
import { random } from '@/utility/functions.ts'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

const options = {
    background: {
        color: {
            value: '#eee'
        }
    },
    fpsLimit: 120,
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: 'push'
            },
            onHover: {
                enable: true,
                mode: 'repulse'
            }
        },
        modes: {
            push: {
                quantity: 4
            },
            repulse: {
                distance: 200,
                duration: 0.4
            }
        }
    },
    particles: {
        color: {
            value: '#f00'
        },
        links: {
            color: '#f00',
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1
        },
        move: {
            direction: 'none' as const,
            enable: true,
            outModes: {
                default: 'bounce' as const
            },
            random: false,
            speed: 6,
            straight: false
        },
        number: {
            density: {
                enable: true
            },
            value: 150
        },
        opacity: {
            value: 0.5
        },
        shape: {
            type: 'circle'
        },
        size: {
            value: { min: 1, max: 5 }
        }
    },
    detectRetina: true
}

const HomePage: React.FC = () => {
    const navigate = useNavigate()
    const typeList = useRef<Array<ButtonType>>([/* 'primary', */ 'info', 'warning', 'danger'])

    const [init, setInit] = useState(false)

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
            // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
            // starting from v2 you can add only the features you need reducing the bundle size
            //await loadAll(engine);
            //await loadFull(engine);
            await loadSlim(engine)
            //await loadBasic(engine);
        }).then(() => {
            setInit(true)
        })
    })

    if (!init) return <></>

    return (
        <div className={`page ${styles.container}`}>
            <Particles id={styles.tsparticles} options={options} />
            <div className={styles.btns}>
                {ROUTES.sort((a, b) => a.order - b.order).map((_) => {
                    const type: ButtonType = typeList.current[random(0, typeList.current.length - 1)]
                    const plain = Math.random() > 0.5
                    const hairline = Math.random() > 0.5
                    return (
                        _.path !== '/' &&
                        _.authority && (
                            <Button
                                key={_.path}
                                className="btn"
                                type={type}
                                plain={plain}
                                round={true}
                                hairline={hairline}
                                shadow={1}
                                onClick={() => navigate(_.path)}
                            >
                                {_.name}
                            </Button>
                        )
                    )
                })}
            </div>
            <DateDisplay />
        </div>
    )
}

export default HomePage
