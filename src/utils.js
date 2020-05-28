const serverAPI = 'http://localhost:3000/'
const encodeQueryData = (data) => {
    const ret = [];
    for (let d in data)
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return '?' +  ret.join('&');
 }

export const fetchResourse = async (resource, method, callback, body=false) => {

    const inParamsData = ['GET', 'DELETE'].includes(method)


    try {
        const res = await fetch(serverAPI + resource + (inParamsData ? encodeQueryData(body) : ''), {
            headers: {
                'Content-Type': 'application/json'
              },
            method,
            ...(body && !inParamsData && {body: JSON.stringify(body).replace(/'/g, '"')})
        } ) 

        const data = await res.json()


        if (res) callback(data)
    } catch (err) {
        console.log(err)
    }
}


const useToggleScreen = (screens) => {

    const screensKeys = screens
    const initialScreenIndex = 0
    const lastIndex = screensKeys.length - 1
  
  
    const [currentScreenIndex, setScreenIndex] = useState(initialScreenIndex)
  
    const toggleScreen = () => {
      if (currentScreenIndex === lastIndex) setScreenIndex(initialScreenIndex)
  
      setScreenIndex(currentScreenIndex + 1)
    }
  
    const screen = screens[currentScreenIndex]
  
  
    return [screen, toggleScreen]
  }