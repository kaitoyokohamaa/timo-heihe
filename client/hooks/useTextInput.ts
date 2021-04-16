import React, { useCallback, useEffect, useState } from "react";

export const REGEXES = {
  HALF_SIZE_NUMBER: "[^a-z0-9-_]",
} as const;

type RegexType = typeof REGEXES[keyof typeof REGEXES];

type Props = {
  initialValue?: string;
  regex?: RegexType;
  required?: boolean;
  max?: number;
  min?: number;
};

const includesInvalidChars = (text: string, regex: RegexType) =>
  new RegExp(regex).test(text);

export const TEXT_INPUT_ERRORS = {
  HALF_SIZE_NUMBER: {
    code: 1,
    message: "半角英数字を入力してください",
  },
  REQUIRED: {
    code: 2,
    message: "必須項目です",
  },
  MIN: {
    code: 3,
    message: "文字以上入力してください",
  },
  MAX: {
    code: 4,
    message: "文字以下で入力してください",
  },
};

const MIN_MESSAGE = "文字以上入力してください";
const MAX_MESSAGE = "文字以下で入力してください";

export type TextInputErrorType = typeof TEXT_INPUT_ERRORS[keyof typeof TEXT_INPUT_ERRORS];

export const useTextInput = ({
  initialValue = "",
  regex,
  required = false,
  min,
  max,
}: Props) => {
  const [value, setValue] = useState(initialValue);
  const [errors, setErrors] = useState<TextInputErrorType[]>([]);
  const [changedCount, setChangedCount] = useState(0);

  useEffect(() => {
    console.log("errors", errors);
  }, [errors]);

  useEffect(() => {
    if (changedCount < 2) {
      setChangedCount(2);
    } else {
      valid();
    }
  }, [value]);

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(event.target.value);
  };

  const valid = useCallback(() => {
    let newErrors: TextInputErrorType[] = [];
    if (regex && includesInvalidChars(value, regex)) {
      switch (regex) {
        case REGEXES.HALF_SIZE_NUMBER:
          newErrors.push(TEXT_INPUT_ERRORS.HALF_SIZE_NUMBER);
          break;
      }
    }

    if (min && value.length < min) {
      TEXT_INPUT_ERRORS.MIN.message = min + MIN_MESSAGE;
      newErrors.push(TEXT_INPUT_ERRORS.MIN);
    }

    if (max && value.length > max) {
      TEXT_INPUT_ERRORS.MAX.message = max + MAX_MESSAGE;
      newErrors.push(TEXT_INPUT_ERRORS.MAX);
    }

    if (required && value === "") {
      newErrors.push(TEXT_INPUT_ERRORS.REQUIRED);
    }
    setErrors(newErrors);
  }, [value]);

  return {
    errors,
    value,
    onChange,
    valid,
  };
};