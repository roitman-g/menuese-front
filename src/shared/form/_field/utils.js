
//checker = {validate: <anyValue => boolean>, message: <string>}
export const useChecker = (checkers = []) => {
    
    const validate = (value, setError) => {
        for (let checker of checkers) {
            if (!checker.validate(value)) {
                setError(checker.message)
                return
            }
        }
        setError(null)
    }
  
    return validate
  }