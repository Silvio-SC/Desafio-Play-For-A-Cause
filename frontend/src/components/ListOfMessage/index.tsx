export const renderTexts = (textos: string[]) => {
    let list = textos.map((text) => {
      <p>{text}</p>
    })
    console.log(list)
    return (
      <>
        {list}
      </>
    )
  }