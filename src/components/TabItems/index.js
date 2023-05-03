import './index.css'

const TabItems = props => {
  const {tabObject, changeTabAndThumbnail} = props
  const {tabId, displayText} = tabObject

  const onClickingTab = () => {
    changeTabAndThumbnail(tabId)
  }

  return (
    <li>
      <button className="tab-name-button" type="button" onClick={onClickingTab}>
        {displayText}
      </button>
    </li>
  )
}
export default TabItems
