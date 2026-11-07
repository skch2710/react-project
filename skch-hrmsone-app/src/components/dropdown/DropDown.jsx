import { memo, useCallback, useEffect, useMemo, useState } from "react";
import {
  Autocomplete,
  Checkbox,
  FormControl,
  FormLabel,
  TextField,
} from "@mui/material";

import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { formLabelStyles } from "../form/formStyles";

const ALL_VALUE = "__DROPDOWN_SELECT_ALL__";
const PAGE_SIZE = 100;
const EMPTY_OPTIONS = [];

const DropDown = memo(
  ({
    multiple = false,
    options = EMPTY_OPTIONS,
    value,
    onChange,
    onBlur,
    placeholder,
    label,
    labelKey,
    valueKey,
    disabled = false,
    required = false,
    error = false,
    helperText,
  }) => {
    const [inputValue, setInputValue] = useState("");
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    useEffect(() => {
      setVisibleCount(PAGE_SIZE);
    }, [options]);

    const allOption = useMemo(
      () => ({
        [labelKey]: "All",
        [valueKey]: ALL_VALUE,
      }),
      [labelKey, valueKey],
    );

    const selectedValues = multiple
      ? Array.isArray(value)
        ? value
        : []
      : (value ?? null);

    const selectedOptions = useMemo(
      () =>
        multiple
          ? selectedValues.filter((option) => option?.[valueKey] !== ALL_VALUE)
          : [],
      [multiple, selectedValues, valueKey],
    );

    const selectedIds = useMemo(
      () => new Set(selectedOptions.map((option) => option?.[valueKey])),
      [selectedOptions, valueKey],
    );

    const allSelected =
      multiple &&
      options.length > 0 &&
      options.every((option) => selectedIds.has(option?.[valueKey]));

    const filteredOptions = useMemo(() => {
      const query = inputValue.trim().toLowerCase();

      if (!query) return options;

      return options.filter((option) =>
        String(option?.[labelKey] ?? "")
          .toLowerCase()
          .includes(query),
      );
    }, [options, inputValue, labelKey]);

    const visibleOptions = useMemo(
      () => filteredOptions.slice(0, visibleCount),
      [filteredOptions, visibleCount],
    );

    const dropdownOptions = useMemo(
      () =>
        multiple && options.length > 0
          ? [allOption, ...visibleOptions]
          : visibleOptions,
      [multiple, options.length, allOption, visibleOptions],
    );

    const displayValue = multiple && allSelected ? [allOption] : selectedValues;

    const handleListboxScroll = useCallback(
      (event) => {
        const listbox = event.currentTarget;

        if (
          listbox.scrollTop + listbox.clientHeight >=
          listbox.scrollHeight - 50
        ) {
          setVisibleCount((current) =>
            Math.min(current + PAGE_SIZE, filteredOptions.length),
          );
        }
      },
      [filteredOptions.length],
    );

    const handleInputChange = useCallback((event, newInputValue, reason) => {
      setInputValue(newInputValue);

      if (reason === "input" || reason === "clear") {
        setVisibleCount(PAGE_SIZE);
      }
    }, []);

    const handleChange = useCallback(
      (event, newValue, reason, details) => {
        if (!multiple) {
          onChange?.(newValue);
          return;
        }

        const clickedOption = details?.option;

        if (clickedOption?.[valueKey] === ALL_VALUE) {
          onChange?.(allSelected ? [] : [allOption, ...options]);
          return;
        }

        if (allSelected && clickedOption) {
          onChange?.(
            selectedOptions.filter(
              (option) => option?.[valueKey] !== clickedOption?.[valueKey],
            ),
          );
          return;
        }

        const nextOptions = (Array.isArray(newValue) ? newValue : []).filter(
          (option) => option?.[valueKey] !== ALL_VALUE,
        );

        const nextIds = new Set(
          nextOptions.map((option) => option?.[valueKey]),
        );

        const nextAllSelected =
          options.length > 0 &&
          options.every((option) => nextIds.has(option?.[valueKey]));

        onChange?.(nextAllSelected ? [allOption, ...nextOptions] : nextOptions);
      },
      [
        multiple,
        onChange,
        valueKey,
        allSelected,
        allOption,
        options,
        selectedOptions,
      ],
    );

    return (
      <FormControl fullWidth required={required}>
        {label && <FormLabel sx={formLabelStyles}>{label}</FormLabel>}

        <Autocomplete
          fullWidth
          multiple={multiple}
          limitTags={1}
          size="small"
          options={dropdownOptions}
          value={displayValue}
          inputValue={multiple ? inputValue : undefined}
          onInputChange={multiple ? handleInputChange : undefined}
          // disabled={disabled}
          disableCloseOnSelect
          onChange={handleChange}
          getOptionKey={(option) => String(option?.[valueKey])}
          getOptionLabel={(option) => String(option?.[labelKey] ?? "")}
          isOptionEqualToValue={(option, selectedValue) =>
            option?.[valueKey] === selectedValue?.[valueKey]
          }
          filterOptions={(filtered) => filtered}
          slotProps={{
            listbox: {
              onScroll: handleListboxScroll,
              sx: {
                maxHeight: 250,
                overflowY: "auto",
              },
            },
          }}
          renderOption={(props, option) => {
            const { key, ...optionProps } = props;

            const isAllOption = option?.[valueKey] === ALL_VALUE;

            const checked = isAllOption
              ? allSelected
              : selectedIds.has(option?.[valueKey]);

            return (
              <li key={key} {...optionProps}>
                {multiple && (
                  <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    checked={checked}
                    sx={{ mr: 1, p: 0.5 }}
                  />
                )}

                {String(option?.[labelKey] ?? "")}
              </li>
            );
          }}
          sx={{
            width: "100%",
            "& .MuiAutocomplete-tag": {
              maxWidth: "60%",
            },
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              // label={label}
              placeholder={placeholder}
              required={required}
              error={error}
              helperText={helperText}
              onBlur={onBlur}
            />
          )}
        />
      </FormControl>
    );
  },
);

export default DropDown;
