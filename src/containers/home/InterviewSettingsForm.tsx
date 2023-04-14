import { Button, Flex, Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import FormSelect from "../../components/formComponents/FormSelect";
import { useFormik } from "formik";
import { PageNumbers } from "../../interface/home";
import { IInterViewSettings } from "../../interface/forms";
import {
  interviewDurationOptions,
  interviewLanguageOptions,
  interviewModeOptions,
} from "./constants";
import * as Yup from "yup";

const InterviewDetailsForm: React.FC<{
  previewValues: IInterViewSettings;
  setPerviewValues: React.Dispatch<React.SetStateAction<IInterViewSettings>>;

  handleTab: (n: PageNumbers) => void;
}> = ({ handleTab, previewValues, setPerviewValues }) => {
  const {
    errors,
    touched,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
  } = useFormik<IInterViewSettings>({
    initialValues: {
      interviewMode: "",
      interviewDuration: "",
      interviewLanguage: "",
    },
    validationSchema: Yup.object().shape({
      interviewMode: Yup.string().required("Interview Mode is required"),
      interviewDuration: Yup.string().required("Interview Duration is required"),
      interviewLanguage: Yup.string().required("Interview Language is required")
    }),
    onSubmit: (values) => {
      console.log({ values });
      alert("Form successfully submitted");
    },
  });

  const handleInterviewChange = (selectedOption: any) => {
    console.log(selectedOption);
    setFieldValue("interviewMode", selectedOption.value);
    setPerviewValues({ ...previewValues, interviewMode: selectedOption.value });
  };

  const handleDurationChange = (selectedOption: any) => {
    console.log(selectedOption);
    setFieldValue("interviewDuration", selectedOption.value);
    setPerviewValues({ ...previewValues, interviewDuration: selectedOption.value });
  };

  const handleLanguageChange = (selectedOption: any) => {
    console.log(selectedOption);
    setFieldValue("interviewLanguage", selectedOption.value);
    setPerviewValues({ ...previewValues, interviewLanguage: selectedOption.value });
  };

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormSelect
          label="Interview Mode"
          placeholder="Select interview mode"
          name="interviewMode"
          options={interviewModeOptions}
          onBlur={setFieldTouched}
          value={values?.interviewMode}
          error={errors?.interviewMode}
          touched={touched?.interviewMode}
          isSelect={true}
          handleSelectChange={handleInterviewChange}
        />
        <FormSelect
          label="Interview Duration"
          placeholder="Select interview duration"
          name="interviewDuration"
          options={interviewDurationOptions}
          isSelect={true}
          handleSelectChange={handleDurationChange}
          onBlur={setFieldTouched}
          value={values?.interviewDuration}
          error={errors?.interviewDuration}
          touched={touched?.interviewDuration}
        />
        <FormSelect
          label="Job Location"
          name="interviewLanguage"
          placeholder="SeinterviewLanguagelect interview language"
          options={interviewLanguageOptions}
          isSelect={true}
          handleSelectChange={handleLanguageChange}
          onBlur={setFieldTouched}
          error={errors.interviewLanguage}
          touched={touched.interviewLanguage}
          value={values.interviewLanguage}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button" onClick={() => handleTab(1)}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Submit
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default InterviewDetailsForm;
