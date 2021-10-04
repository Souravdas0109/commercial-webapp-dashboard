export const userImage = {
    getLoggedInUserImage: () => {
      if (localStorage && localStorage.getItem('_Gresponse')) {
        const userImage = JSON.parse(
          localStorage && localStorage.getItem('_Gresponse')
        )
        const image = userImage && userImage.profileObj && userImage.profileObj.imageUrl ? userImage.profileObj.imageUrl: ''
        return image
      } else {
        return ''
      }
    },
  }