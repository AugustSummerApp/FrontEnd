
function MacrosPage() {
  return (
    <div className="Macros-main">
        <div>
          <form className="Macros-form" action="">
            <select className="Optionselect" id="" >
              <option>Breakfast</option>
              <option>Lunch</option>
              <option>Dinner</option>
              <option>Snacks</option>
            </select>
            <input type="text"/>
            <input placeholder="Amount in Grams" type="text"/>
            <button>Logg Meal!</button>
          </form>

          <div className="Current-macros-sum">
            <h2>Summary</h2>
            <span>kcal:</span>
            <span>Protein:</span>
            <span>Fat:</span>
            <span>Carbs:</span>
          </div>
        </div>

    </div>
  )
}

export default MacrosPage