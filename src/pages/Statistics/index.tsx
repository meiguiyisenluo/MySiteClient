import { statistics } from '@/resources/api-constants'
import { useLoaderData } from 'react-router-dom'

export const loader = async () => {
    return await statistics()
        .then((res) => res.data)
        .catch(() => ({}))
}

const Statistics: React.FC = () => {
    const loaderData = useLoaderData() as { pv: number }
    return (
        // eslint-disable-next-line react/react-in-jsx-scope
        <div className={`page`} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '5rem', fontWeight: 'bold' }}>
            pv: {loaderData.pv}
        </div>
    )
}

export const Component = Statistics
