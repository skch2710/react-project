import { memo, useCallback, useEffect, useMemo, useState } from "react";

import { Autocomplete, Checkbox, TextField } from "@mui/material";

import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

const ALL_VALUE = "__DROPDOWN_SELECT_ALL__";
const PAGE_SIZE = 100;

const EMPTY_OPTIONS = [];

const DropDown = memo(
  ({
    multiple = false,
    options = EMPTY_OPTIONS,
    value,
    onChange,
    placeholder,
    labelKey,
    valueKey,
    disabled = false,
  }) => {
    const [inputValue, setInputValue] = useState("");
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    // Reset pagination when the source options change.
    useEffect(() => {
      setVisibleCount(PAGE_SIZE);
    }, [options]);

    // Special Select All option.
    const allOption = useMemo(
      () => ({
        [labelKey]: "All",
        [valueKey]: ALL_VALUE,
      }),
      [labelKey, valueKey],
    );

    // Normalize the selected value.
    const selectedValues = multiple
      ? Array.isArray(value)
        ? value
        : []
      : (value ?? null);

    // Exclude the special All option from actual selections.
    const selectedOptions = useMemo(
      () =>
        multiple
          ? selectedValues.filter((option) => option?.[valueKey] !== ALL_VALUE)
          : [],
      [multiple, selectedValues, valueKey],
    );

    // Use Set for efficient selection checks.
    const selectedIds = useMemo(
      () => new Set(selectedOptions.map((option) => option?.[valueKey])),
      [selectedOptions, valueKey],
    );

    // Check whether every actual option is selected.
    const allSelected =
      multiple &&
      options.length > 0 &&
      options.every((option) => selectedIds.has(option?.[valueKey]));

    // Filter options using the search text.
    const filteredOptions = useMemo(() => {
      const query = inputValue.trim().toLowerCase();

      if (!query) {
        return options;
      }

      return options.filter((option) =>
        String(option?.[labelKey] ?? "")
          .toLowerCase()
          .includes(query),
      );
    }, [options, inputValue, labelKey]);

    // Load only the first 100 options initially.
    const visibleOptions = useMemo(
      () => filteredOptions.slice(0, visibleCount),
      [filteredOptions, visibleCount],
    );

    // Keep All visible and add the currently visible options.
    const dropdownOptions = useMemo(
      () =>
        multiple && options.length > 0
          ? [allOption, ...visibleOptions]
          : visibleOptions,
      [multiple, options.length, allOption, visibleOptions],
    );

    // Display only All when every actual option is selected.
    const displayValue = multiple && allSelected ? [allOption] : selectedValues;

    // Load another batch when the user scrolls near the bottom.
    const handleListboxScroll = useCallback(
      (event) => {
        const listbox = event.currentTarget;

        const nearBottom =
          listbox.scrollTop + listbox.clientHeight >= listbox.scrollHeight - 50;

        if (nearBottom) {
          setVisibleCount((current) =>
            Math.min(current + PAGE_SIZE, filteredOptions.length),
          );
        }
      },
      [filteredOptions.length],
    );

    // Handle input changes and restart pagination for a new search.
    const handleInputChange = useCallback((event, newInputValue, reason) => {
      setInputValue(newInputValue);

      if (reason === "input" || reason === "clear") {
        setVisibleCount(PAGE_SIZE);
      }
    }, []);

    // Handle selection changes.
    const handleChange = useCallback(
      (event, newValue, reason, details) => {
        // Single selection returns one object or null.
        if (!multiple) {
          onChange?.(newValue);
          return;
        }

        const clickedOption = details?.option;

        // Select All / Deselect All.
        if (clickedOption?.[valueKey] === ALL_VALUE) {
          onChange?.(allSelected ? [] : [allOption, ...options]);
          return;
        }

        // If everything was selected, remove only the clicked option.
        if (allSelected && clickedOption) {
          const nextOptions = selectedOptions.filter(
            (option) => option?.[valueKey] !== clickedOption?.[valueKey],
          );

          onChange?.(nextOptions);
          return;
        }

        // Normal individual selection and deselection.
        const nextOptions = (Array.isArray(newValue) ? newValue : []).filter(
          (option) => option?.[valueKey] !== ALL_VALUE,
        );

        const nextIds = new Set(
          nextOptions.map((option) => option?.[valueKey]),
        );

        const nextAllSelected =
          options.length > 0 &&
          options.every((option) => nextIds.has(option?.[valueKey]));

        // Include All when all actual options are selected.
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
      <Autocomplete
        fullWidth
        multiple={multiple}
        limitTags={1}
        size="small"
        options={dropdownOptions}
        value={displayValue}
        inputValue={multiple ? inputValue : undefined}
        onInputChange={multiple ? handleInputChange : undefined}
        disabled={disabled}
        disableCloseOnSelect
        onChange={handleChange}
        // Prevent duplicate React keys when labels repeat.
        getOptionKey={(option) => String(option?.[valueKey])}
        getOptionLabel={(option) => String(option?.[labelKey] ?? "")}
        // Compare options by unique ID, not by label.
        isOptionEqualToValue={(option, selectedValue) =>
          option?.[valueKey] === selectedValue?.[valueKey]
        }
        // Filtering is already performed above.
        // Do not filter the visible options a second time.
        filterOptions={(filtered) => filtered}
        // Incrementally load options while scrolling.
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
                  sx={{
                    mr: 1,
                    p: 0.5,
                  }}
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
          <TextField {...params} placeholder={placeholder} />
        )}
      />
    );
  },
);

export default DropDown;
