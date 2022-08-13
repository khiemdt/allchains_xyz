import { Close } from "@mui/icons-material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import {
  Box,
  Button,
  ButtonBase,
  Collapse,
  IconButton,
  Paper,
  Radio,
  Slide,
  Slider,
  Typography,
} from "@mui/material";
import { useCallback } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { FormattedMessage, FormattedNumber } from "react-intl";
import { OpenState } from "../../common/components/elements";
import SchemaElement from "../../common/SchemaForm/SchemaElement";
import useSwapLogic, { SettingInterface } from "./useSwapLogic";

interface Props extends ReturnType<typeof useSwapLogic> {}
const SettingBox = (props: Props) => {
  const {
    openSettings,
    setOpenSetting,
    settingsFormData,
    setSettingFormData,
    gasPrice,
  } = props;

  const methods = useForm<SettingInterface>({
    defaultValues: settingsFormData,
    reValidateMode: "onChange",
    mode: "onSubmit",
  });
  const { handleSubmit, control, watch, reset } = methods;

  const formValue = watch();

  const onSubmitForm = useCallback(
    (value: SettingInterface) => {
      setSettingFormData(value);
      setOpenSetting(false);
    },
    [setOpenSetting, setSettingFormData]
  );

  return (
    <Slide
      direction="up"
      in={openSettings}
      mountOnEnter
      unmountOnExit
      onEnter={() =>
        reset({
          ...settingsFormData,
          gasPrice: settingsFormData.gasPrice || gasPrice.fast / 10,
        })
      }
    >
      <Paper
        style={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          overflow: "hidden",
        }}
      >
        <FormProvider {...methods}>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
            onSubmit={handleSubmit(onSubmitForm)}
          >
            <Paper
              sx={{
                display: "flex",
                alignItems: "center",
                position: "sticky",
                top: 0,
                zIndex: 2,
                paddingBottom: 1,
                borderBottom: 1,
                borderColor: "divider",
                borderRadius: 0,
                padding: "16px 24px",
              }}
            >
              <Typography variant="h6" style={{ flex: 1 }}>
                <FormattedMessage id={"advanceSetting"} />
              </Typography>
              <IconButton onClick={() => setOpenSetting(false)}>
                <Close />
              </IconButton>
            </Paper>
            <Box height="100%" overflow="auto">
              <OpenState>
                {({ open, setOpen }) => {
                  return (
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <ButtonBase
                        sx={{
                          justifyContent: "flex-start",
                          textAlign: "start",
                          alignItems: "center",
                          "&:hover": { color: "primary.main" },
                          width: "100%",
                          padding: "16px 24px",
                        }}
                        onClick={() => setOpen(!open)}
                      >
                        <Typography style={{ flex: 1, color: "inherit" }}>
                          <FormattedMessage id={"maxSlippage"} />
                        </Typography>
                        <Box display="flex" alignItems="center">
                          <FormattedNumber
                            style={"percent"}
                            value={formValue.slippagePercentage}
                            minimumFractionDigits={1}
                          />
                          <KeyboardArrowDownRoundedIcon
                            style={{
                              transform: open
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                              transition: "0.3s",
                            }}
                          />
                        </Box>
                      </ButtonBase>
                      <Collapse in={open}>
                        <Box sx={{ padding: "16px 24px" }}>
                          <Controller
                            name={"slippagePercentage"}
                            control={control}
                            render={({ field: { onChange, value } }) => (
                              <Slider
                                aria-label="Volume"
                                value={value}
                                onChange={(_, newValue) => {
                                  onChange(newValue);
                                }}
                                min={0.001}
                                max={0.2}
                                step={0.001}
                              />
                            )}
                          />
                        </Box>
                      </Collapse>
                    </Box>
                  );
                }}
              </OpenState>
              <OpenState>
                {({ open, setOpen }) => {
                  return (
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <ButtonBase
                        sx={{
                          justifyContent: "flex-start",
                          textAlign: "start",
                          alignItems: "center",
                          "&:hover": { color: "primary.main" },
                          width: "100%",
                          padding: "16px 24px",
                        }}
                        onClick={() => setOpen(!open)}
                      >
                        <Typography style={{ flex: 1, color: "inherit" }}>
                          <FormattedMessage id={"gasPrice"} />
                        </Typography>
                        <Box display="flex" alignItems="center">
                          <Typography style={{ color: "inherit" }}>
                            {formValue.type === "custom"
                              ? formValue.gasPrice
                              : gasPrice[formValue.type] / 10}{" "}
                            &nbsp;
                            <FormattedMessage id={"gwei"} />
                          </Typography>

                          <KeyboardArrowDownRoundedIcon
                            style={{
                              transform: open
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                              transition: "0.3s",
                            }}
                          />
                        </Box>
                      </ButtonBase>
                      <Collapse in={open}>
                        <Box
                          paddingX={2}
                          paddingBottom={2}
                          display="flex"
                          flexDirection="column"
                          gap={2}
                        >
                          <Controller
                            name={"type"}
                            control={control}
                            render={({ field: { onChange, value } }) => (
                              <>
                                <ButtonBase
                                  sx={{
                                    display: "flex",
                                    textAlign: "start",
                                    minHeight: 64,
                                    justifyContent: "flex-start",
                                    border: 1,
                                    color: "inherit",
                                    borderColor: "primary.main",
                                    paddingX: 1,
                                    paddingY: 1,
                                    borderRadius: 2,
                                    width: "100%",
                                  }}
                                  onClick={() => {
                                    onChange("fast");
                                  }}
                                >
                                  <Radio checked={value === "fast"} />
                                  &nbsp;
                                  <Typography
                                    style={{ flex: 1, color: "inherit" }}
                                  >
                                    <FormattedMessage id={"fast"} />
                                  </Typography>
                                  <Typography style={{ color: "inherit" }}>
                                    {gasPrice.fast / 10} &nbsp;
                                    <FormattedMessage id={"gwei"} />
                                  </Typography>
                                </ButtonBase>
                                <ButtonBase
                                  sx={{
                                    display: "flex",
                                    textAlign: "start",
                                    minHeight: 64,
                                    justifyContent: "flex-start",
                                    border: 1,
                                    color: "inherit",
                                    borderColor: "primary.main",
                                    paddingX: 1,
                                    paddingY: 1,
                                    borderRadius: 2,
                                    width: "100%",
                                  }}
                                  onClick={() => {
                                    onChange("fastest");
                                  }}
                                >
                                  <Radio checked={value === "fastest"} />
                                  &nbsp;
                                  <Typography
                                    style={{ flex: 1, color: "inherit" }}
                                  >
                                    <FormattedMessage id={"fastest"} />
                                  </Typography>
                                  <Typography style={{ color: "inherit" }}>
                                    {gasPrice.fastest / 10} &nbsp;
                                    <FormattedMessage id={"gwei"} />
                                  </Typography>
                                </ButtonBase>
                                <ButtonBase
                                  sx={{
                                    display: "flex",
                                    textAlign: "start",
                                    minHeight: 64,
                                    justifyContent: "flex-start",
                                    border: 1,
                                    color: "inherit",
                                    borderColor: "primary.main",
                                    paddingX: 1,
                                    paddingY: 1,
                                    borderRadius: 2,
                                    width: "100%",
                                  }}
                                  onClick={() => {
                                    onChange("custom");
                                  }}
                                >
                                  <Radio checked={value === "custom"} />
                                  &nbsp;
                                  <Typography
                                    style={{ flex: 1, color: "inherit" }}
                                  >
                                    <FormattedMessage id={"fastest"} />
                                  </Typography>
                                  <Box>
                                    <SchemaElement
                                      fieldName={"gasPrice"}
                                      propsElement={{
                                        type: "text-field",
                                        style: { width: 60 },
                                        defaultValue: gasPrice.fast / 10,
                                        InputProps: {
                                          style: {
                                            backgroundColor: "inherit",
                                          },
                                        },
                                        inputProps: {
                                          style: {
                                            textAlign: "center",
                                          },
                                        },
                                        inputType: "number",
                                        noHelperText: true,
                                        register: {
                                          required: formValue.type === "custom",
                                        },
                                      }}
                                    />
                                  </Box>
                                  &nbsp; &nbsp;
                                  <Typography style={{ color: "inherit" }}>
                                    <FormattedMessage id={"gwei"} />
                                  </Typography>
                                </ButtonBase>
                              </>
                            )}
                          />
                        </Box>
                      </Collapse>
                    </Box>
                  );
                }}
              </OpenState>
            </Box>
            <Paper
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                position: "sticky",
                bottom: 0,
                zIndex: 2,
                paddingBottom: 1,
                borderRadius: 0,
                borderTop: 1,
                borderColor: "divider",
                padding: "16px 24px",
              }}
            >
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                style={{ width: 100 }}
              >
                <FormattedMessage id="reset" />
              </Button>
              <Button type="submit" size="large" style={{ width: 100 }}>
                <FormattedMessage id="save" />
              </Button>
            </Paper>
          </form>
        </FormProvider>
      </Paper>
    </Slide>
  );
};
export default SettingBox;
