import { useNavigate } from "react-router-dom"

function Homepage() {
    const navigate = useNavigate()
  return (
    <div>Homepage WIP
        <button 
        onClick={() => navigate('/Training')}>
            Click Here To See Training Page
        </button>

    </div>
  )
}

export default Homepage