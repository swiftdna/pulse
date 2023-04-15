// export default function Home() {
//     return (
//       <Card>
//         <CardContent>
//           <FormikStepper
//             initialValues={{
//               firstName: '',
//               lastName: '',
//               millionaire: false,
//               money: 0,
//               description: '',
//             }}
//             onSubmit={async (values) => {
//               await sleep(3000);
//               console.log('values', values);
//             }}
//           >
//             <FormikStep label="Personal Data">
//               <Box paddingBottom={2}>
//                 <Field fullWidth name="firstName" component={TextField} label="First Name" />
//               </Box>
//               <Box paddingBottom={2}>
//                 <Field fullWidth name="lastName" component={TextField} label="Last Name" />
//               </Box>
//               <Box paddingBottom={2}>
//                 <Field
//                   name="millionaire"
//                   type="checkbox"
//                   component={CheckboxWithLabel}
//                   Label={{ label: 'I am a millionaire' }}
//                 />
//               </Box>
//             </FormikStep>
//             <FormikStep
//               label="Bank Accounts"
//               validationSchema={object({
//                 money: mixed().when('millionaire', {
//                   is: true,
//                   then: number()
//                     .required()
//                     .min(
//                       1_000_000,
//                       'Because you said you are a millionaire you need to have 1 million'
//                     ),
//                   otherwise: number().required(),
//                 }),
//               })}
//             >
//               <Box paddingBottom={2}>
//                 <Field
//                   fullWidth
//                   name="money"
//                   type="number"
//                   component={TextField}
//                   label="All the money I have"
//                 />
//               </Box>
//             </FormikStep>
//             <FormikStep label="More Info">
//               <Box paddingBottom={2}>
//                 <Field fullWidth name="description" component={TextField} label="Description" />
//               </Box>
//             </FormikStep>
//           </FormikStepper>
//         </CardContent>
//       </Card>
//     );
//   }
  
//   export interface FormikStepProps
//     extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
//     label: string;
//   }
  
//   export function FormikStep({ children }: FormikStepProps) {
//     return <>{children}</>;
//   }
  
//   export function FormikStepper({ children, ...props }: FormikConfig<FormikValues>) {
//     const childrenArray = React.Children.toArray(children) as React.ReactElement<FormikStepProps>[];
//     const [step, setStep] = useState(0);
//     const currentChild = childrenArray[step];
//     const [completed, setCompleted] = useState(false);
  
//     function isLastStep() {
//       return step === childrenArray.length - 1;
//     }
  
//     return (
//       <Formik
//         {...props}
//         validationSchema={currentChild.props.validationSchema}
//         onSubmit={async (values, helpers) => {
//           if (isLastStep()) {
//             await props.onSubmit(values, helpers);
//             setCompleted(true);
//           } else {
//             setStep((s) => s + 1);
  
//             // the next line was not covered in the youtube video
//             //
//             // If you have multiple fields on the same step
//             // we will see they show the validation error all at the same time after the first step!
//             //
//             // If you want to keep that behaviour, then, comment the next line :)
//             // If you want the second/third/fourth/etc steps with the same behaviour
//             //    as the first step regarding validation errors, then the next line is for you! =)
//             //
//             // In the example of the video, it doesn't make any difference, because we only
//             //    have one field with validation in the second step :)
//             helpers.setTouched({});
//           }
//         }}
//       >
//         {({ isSubmitting }) => (
//           <Form autoComplete="off">
//             <Stepper alternativeLabel activeStep={step}>
//               {childrenArray.map((child, index) => (
//                 <Step key={child.props.label} completed={step > index || completed}>
//                   <StepLabel>{child.props.label}</StepLabel>
//                 </Step>
//               ))}
//             </Stepper>
  
//             {currentChild}
  
//             <Grid container spacing={2}>
//               {step > 0 ? (
//                 <Grid item>
//                   <Button
//                     disabled={isSubmitting}
//                     variant="contained"
//                     color="primary"
//                     onClick={() => setStep((s) => s - 1)}
//                   >
//                     Back
//                   </Button>
//                 </Grid>
//               ) : null}
//               <Grid item>
//                 <Button
//                   startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
//                   disabled={isSubmitting}
//                   variant="contained"
//                   color="primary"
//                   type="submit"
//                 >
//                   {isSubmitting ? 'Submitting' : isLastStep() ? 'Submit' : 'Next'}
//                 </Button>
//               </Grid>
//             </Grid>
//           </Form>
//         )}
//       </Formik>
//     );
//   }

//   return (
//     <Card>
//       <CardContent>
//       <div className="container main-frame">
//             <div className="div1-drone-catalog">
//                 <br></br>
//                 <h1 className='header-dronecatalog' style={{marginLeft:"100px"}}> Farmer Information</h1>
//                 <h5 className='heading-dronecatalog' style={{marginTop:"20px",marginLeft:"100px"}}>Fill in the data for your profile. It will only take a couple of minutes.</h5>
//             </div>
//             <div className='userDetails'>
//                 <FormikStepper
//                 initialValues={{
//                     // firstName: '',
//                     // lastName: '',
//                     // millionaire: false,
//                     // money: 0,
//                     // description: '',
//                     fullName: '',
//                     phonenumber: '',
//                     address: '',
//                     city: '',
//                     state: '',
//                     country: '',
//                     zipcode: '',
//                     farmname: '',
//                     lat: 0,
//                     lng: 0,
//                     farmaddress: '',
//                     farmtype: '',
//                     ownername: '',
//                     area: 0,
//                     issuedate: '',
//                     landcert: '',
//                     idname: '',
//                     licenseid: '',
//                     licenseimg: '',
//                     billid: '',
//                     utilitybilldate: '',
//                     utilityfile: '',
//                     cardname: '',
//                     cardnum: '',
//                     expdate: '',
//                     cvv: ''
//                 }}
//                 onSubmit={async (values) => {
//                     // await sleep(3000);
//                     console.log('values', values);
//                 }}
//                 >
//                 <FormikStep label="Farmer info">
//                     <Box paddingBottom={2}>
//                     <Field fullWidth name="fullName" component={TextField} label="Full Name" />
//                     </Box>
//                     <Box paddingBottom={2}>
//                     <Field fullWidth name="phonenumber" component={TextField} label="Phone" />
//                     </Box>
//                     <Box paddingBottom={2}>
//                     <Field fullWidth name="address" component={TextField} label="Address" />
//                     </Box>
//                     <Box paddingBottom={2}>
//                     <Field fullWidth name="city" component={TextField} label="City" />
//                     </Box>
//                     <Box paddingBottom={2}>
//                     <Field fullWidth name="country" component={TextField} label="Country" />
//                     </Box>
//                     <Box paddingBottom={2}>
//                     <Field fullWidth name="state" component={TextField} label="State" />
//                     </Box>
//                     <Box paddingBottom={2}>
//                     <Field fullWidth name="zipcode" component={TextField} label="Zipcode" />
//                     </Box>
//                 </FormikStep>
//                 {/* <FormikStep label="Farm info">
//                     <Box paddingBottom={2}>
//                     <Field
//                         fullWidth
//                         name="money"
//                         type="number"
//                         component={TextField}
//                         label="All the money I have"
//                     />
//                     </Box>
//                 </FormikStep>
//                 <FormikStep label="Farm verification info">
//                     <Box paddingBottom={2}>
//                     <Field fullWidth name="description" component={TextField} label="Description" />
//                     </Box>
//                 </FormikStep>
//                 <FormikStep label="ID details">
//                     <Box paddingBottom={2}>
//                     <Field fullWidth name="description" component={TextField} label="Description" />
//                     </Box>
//                 </FormikStep>
//                 <FormikStep label="Utility bill">
//                     <Box paddingBottom={2}>
//                     <Field fullWidth name="description" component={TextField} label="Description" />
//                     </Box>
//                 </FormikStep>
//                 <FormikStep label="Billing info">
//                     <Box paddingBottom={2}>
//                     <Field fullWidth name="description" component={TextField} label="Description" />
//                     </Box>
//                 </FormikStep> */}
//                 </FormikStepper>
//             </div>
//         </div>
//       </CardContent>
//     </Card>
//   );


// switch (step) {
    //   case 1:
    //     return (
    //       <FarmerInfo1
    //         nextStep={this.nextStep}
    //         handleChange={this.handleChange}
    //         values={values}
    //       />
    //     );
    //   case 2:
    //     return (
    //       <FarmInfo
    //         nextStep={this.nextStep}
    //         prevStep={this.prevStep}
    //         handleChange={this.handleChange}
    //         values={values}
    //       />
    //     );
    //   case 3:
    //     return (
    //       <LandOwner
    //         nextStep={this.nextStep}
    //         prevStep={this.prevStep}
    //         handleChange={this.handleChange}
    //         values={values}
    //       />
    //     );
    //   case 4:
    //     return (
    //       <IDInfo
    //         nextStep={this.nextStep}
    //         prevStep={this.prevStep}
    //         handleChange={this.handleChange}
    //         values={values}
    //       />
    //     );
    //   case 5:
    //     return (
    //       <UtilityBill
    //         nextStep={this.nextStep}
    //         prevStep={this.prevStep}
    //         handleChange={this.handleChange}
    //         values={values}
    //       />
    //     );
    //   case 6:
    //     return (
    //       <BillingInfo
    //         nextStep={this.nextStep}
    //         prevStep={this.prevStep}
    //         handleChange={this.handleChange}
    //         values={values}
    //       />
    //     );  
    //   case 7:
    //     return (
    //       <ReviewRegistration
    //         nextStep={this.nextStep}
    //         prevStep={this.prevStep}
    //         values={values}
    //       />
    //     );
    //   default:
    //     (console.log('This is a multi-step form built with React.'))
    // }