import { Button, Flex, Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import FormInput from "../../components/formComponents/FormInput";
import FormSelect from "../../components/formComponents/FormSelect";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PageNumbers } from "../../interface/home";
import { IRequisitionDetails } from "../../interface/forms";
import { genderOptions, urgencyOptions } from "./constants";
import PreviewCard from "./PreviewCard";
import { useState } from "react";

const RequisitionDetailsForm: React.FC<{
  handleTab: (n: PageNumbers) => void;
  previewData: IRequisitionDetails;
  setPreviewData: React.Dispatch<React.SetStateAction<IRequisitionDetails>>;
}> = ({ handleTab, previewData, setPreviewData }) => {
  const {
    handleChange,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
    isValid,
  } = useFormik<IRequisitionDetails>({
    initialValues: {
      requisitionTitle: "",
      noOfOpenings: 0,
      urgency: "",
      gender: "",
    },
    validationSchema: Yup.object().shape({
      requisitionTitle: Yup.string().required("Requisition title is required"),
      noOfOpenings: Yup.number()
        .typeError("Enter a valid number")
        .required("Number of openings is required")
        .positive("Enter a valid number")
        .min(1, "Enter a valid number"),
      urgency: Yup.string().required("Urgency is required"),
      gender: Yup.string().required("Gender is required"),
    }),
    onSubmit: (values) => {
      handleTab(1);
    },
  });
  const handleGenderChange = (selectedOption: any) => {
    console.log(selectedOption);
    setFieldValue("gender", selectedOption.value);
    setPreviewData({ ...previewData, gender: selectedOption.value });
  };

  const handleUrgencyChange = (selectedOption: any) => {
    console.log(selectedOption);

    setFieldValue("urgency", selectedOption.value);
    setPreviewData({ ...previewData, urgency: selectedOption.value });
  };

  useEffect(() => {
    console.log(previewData);
  }, [previewData]);

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Requisition Title"
          placeholder="Enter requisition title"
          name="requisitionTitle"
          onChange={(e) => {
            handleChange(e);
            setPreviewData({ ...values, requisitionTitle: e.target.value });
          }}
          onBlur={handleBlur}
          value={values?.requisitionTitle}
          error={errors?.requisitionTitle}
          touched={touched?.requisitionTitle}
        />
        <FormInput
          label="Number of openings"
          placeholder="Enter number of openings"
          name="noOfOpenings"
          onChange={(e) => {
            handleChange(e);
            setPreviewData({
              ...values,
              noOfOpenings: parseInt(e.target.value),
            });
          }}
          onBlur={handleBlur}
          value={values?.noOfOpenings}
          error={errors?.noOfOpenings}
          touched={touched?.noOfOpenings}
        />
        <FormSelect
          isSelect={true}
          label="Gender"
          name="gender"
          placeholder="Select gender"
          options={genderOptions}
          handleSelectChange={handleGenderChange}
          onBlur={() => setFieldTouched("gender", true)}
          error={errors.gender}
          touched={touched.gender}
          value={values.gender}
        />
        <FormSelect
          isSelect={true}
          label="Urgency"
          name="urgency"
          placeholder="Select urgency"
          options={urgencyOptions}
          handleSelectChange={handleUrgencyChange}
          onBlur={() => setFieldTouched("urgency", true)}
          error={errors.urgency}
          touched={touched.urgency}
          value={values.urgency}
        />
        <Flex w="100%" justify="flex-end" mt="4rem">
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
      {/* <PreviewCard requisitionDetails ={previewData} /> */}
      {/* <PreviewCard requisitionDetails={previewData} /> */}
    </Box>
  );
};

export default RequisitionDetailsForm;
