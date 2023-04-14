import { Button, Flex, Box } from "@chakra-ui/react";
import React, {useEffect} from "react";
import FormInput from "../../components/formComponents/FormInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PageNumbers } from "../../interface/home";
import { IJobDetails, IJobDetailsValues } from "../../interface/forms";
import PreviewCard from "./PreviewCard";
import { useState } from "react";
import HomeLayout from "./HomeLayout";

const JobDetailsForm: React.FC<{
  handleTab: (n: PageNumbers) => void;
  formData: IJobDetails;
  setFormData: React.Dispatch<React.SetStateAction<IJobDetails>>;

}> = ({ handleTab, formData, setFormData }) => {


  const { handleChange, errors, touched, handleBlur, handleSubmit, values } =
    useFormik<IJobDetails>({
      initialValues: {
        jobTitle: "",
        jobDetails: "",
        jobLocation: "",

       

      },
      validationSchema: Yup.object().shape({
        jobTitle: Yup.string().required("Job Title is required"),
        jobDetails: Yup.string().required("Job Details is required"),
        jobLocation: Yup.string().required("Job Location is required"),
      }),
      onSubmit: (values) => {
        console.log({ values });
        handleTab(2);
      },
    });

  //    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //      handleChange(e);
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  //  };
  
  
   useEffect(() => {
    console.log(formData);
  }, [formData]);
  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Job Title"
          placeholder="Enter job title"
          name="jobTitle"
          onChange={(e) => {
            handleChange(e);
            setFormData({ ...values, jobTitle: e.target.value });
          }}
          onBlur={handleBlur}
          value={values?.jobTitle}
          error={errors?.jobTitle}
          touched={touched?.jobTitle}
        />
        <FormInput
          label="Job Details"
          placeholder="Enter job details"
          name="jobDetails"
          onChange={(e) => {
            handleChange(e);
            setFormData({ ...values, jobDetails: e.target.value });
          }}
          onBlur={handleBlur}
          value={values?.jobDetails}
          error={errors?.jobDetails}
          touched={touched?.jobDetails}
        />
        <FormInput
          label="Job Location"
          name="jobLocation"
          placeholder="Enter job location"
          onChange={(e) => {
            handleChange(e);
            setFormData({ ...values, jobLocation: e.target.value });
          }}
          onBlur={handleBlur}
          error={errors.jobLocation}
          touched={touched.jobLocation}
          value={values.jobLocation}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button" onClick={() => handleTab(0)}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit" onClick={() => handleTab(2) }>
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default JobDetailsForm;
