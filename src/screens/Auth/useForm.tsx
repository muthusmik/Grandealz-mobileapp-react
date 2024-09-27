import { useState, useEffect } from "react";


const useForm = (validate) => {
  const [details] = useState({});
  var [data, setData] = useState()
  const [formValues, setFormValues] = useState(details);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e, name) => {
    // const { name, value } = e.target;
    // console.log(formValues, "useformdata.....");
    setFormValues({ ...formValues, [name]: e });
  };
  

  const syncvalue = (email,password) =>{

      setFormValues({email,password})
       console.log(formValues, "samuel data////////////////////////////////");
  }
  const handleSubmit = (e, type) => {
    console.log("uuuuuuuuuuuuuuuuutttttt",formValues)
    // e.preventDefault();
    switch (type) {
      case '1': console.log("Login Page", type);
        if (formValues.email && formValues.password) {
          console.log("type",formValues,".............",validate(formValues))
          setFormErrors(validate(formValues))
        }
        else {
          console.log("typeElse",formValues,".............",validate(formValues))
          if (!formValues.email && !formValues.password) {

            let Error = { "email": "Please enter EmailId!","password":"Please enter valid password" }

            setFormErrors(Error)
          } else if (formValues.email && !formValues.password) {
            let Error = { "password": "Please enter valid password" }
            setFormErrors(Error)
          } else if (!formValues.email && formValues.password) {
            let Error = { "email": "Please enter valid Email" }
            setFormErrors(Error)
          }
        }
        break;
      case '2':
        //signup  
        if (formValues.firstName && formValues.lastName && formValues.email && formValues.password && formValues.phone) {
          setFormErrors(validate(formValues));
          console.log("sujithhhhhhhhh", formValues)
        }
        else {
          if (!formValues.firstName && formValues.lastName && formValues.email && formValues.password && formValues.phone) {
            let Error = { "firstName": "First Name is required!" }
            setFormErrors(Error);
          }
          if (!formValues.lastName && formValues.firstName && formValues.email && formValues.password && formValues.phone) {
            let Error = { "lastName": "Last Name is required!" }
            setFormErrors(Error);
          }
          if (!formValues.email && formValues.lastName && formValues.firstName && formValues.password && formValues.phone) {
            let Error = { "email": "Email is required!" }
            setFormErrors(Error);
          }
          if (!formValues.password && formValues.lastName && formValues.email && formValues.firstName && formValues.phone) {
            let Error = { "password": "Password is not Valid!" }
            setFormErrors(Error);
          }
          if (!formValues.phone && formValues.lastName && formValues.email && formValues.password && formValues.firstName) {
            let Error = { "phone": "phone number is required" }
            setFormErrors(Error);
          }
          else {
            let Error = { "firstName": "First Name is required!", "lastName": "Last Name is required!","email": "Email is required!","password": "Password is not Valid!","phone": "phone number is required"  }
            setFormErrors(Error);
          }
        }
        break;
      case '3': console.log("Forgot Password");
        if (formValues.forgotemail !== undefined) {
          setFormErrors(validate(formValues));
        }
        else {
          let Error = { "forgotemail": "Email is required!" }
          setFormErrors(Error);
        }
        break;
    }
    console.log('formValues handlesubmit', formValues);
    //setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log("hellooo",formErrors)
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues, 'formValues.......', formErrors, "samuel");
      setData(formValues);
    }
  }, [formErrors]);

  return { handleChange, details, handleSubmit, formErrors, data, formValues,syncvalue }

}
export default useForm;