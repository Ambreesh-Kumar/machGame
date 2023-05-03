import './index.css'

const ImageItems = props => {
  const {imageObject, matchThumbnailWithImage} = props
  const {id, imageUrl, thumbnailUrl, category} = imageObject

  const onclickThumbnail = () => {
    matchThumbnailWithImage(id)
  }
  return (
    <li className="thumbnail-list">
      <button className="button" type="button" onClick={onclickThumbnail}>
        <img src={thumbnailUrl} alt="thumbnail" className="thumbnail-image" />
      </button>
    </li>
  )
}
export default ImageItems
