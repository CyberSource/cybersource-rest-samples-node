#!/bin/bash
FILECOUNT=0
FAILCOUNT=0
SAMPLECOUNT=1
FAILED_SAMPLES=()
find Samples -print | grep -i -e "\.js$"    > list.txt

echo > output.log

while IFS="" read -r p || [ -n "$p" ]
do
  if [[ "$p" =~ $(echo ^\($(sed 's/[[:blank:]]//g' sampleCodeIgnoreList.txt | paste -sd '|' /dev/stdin)\)$) ]]; then
    printf '\n\n#### SKIPPED - %s ####\n' "$p"
    printf '\n\n#### SKIPPED - %s ####\n' "$p" >> output.log
  else
    printf '\n\n**** RUNNING - %s ****\n' "$p"
    printf '\n\n%s **** RUNNING - %s ****\n' "$SAMPLECOUNT" "$p" >> output.log
    if node "$p" >> output.log 2>&1; then
      printf '\n\n**** END RUNNING - %s ****\n' "$p" >> output.log
      FILECOUNT=$((FILECOUNT+1))
    else
      EXITCODE=$?
      printf '\n\n'
      printf '################################################################################\n'
      printf '################################################################################\n'
      printf '###                                                                          ###\n'
      printf '###                    [SAMPLE CODE FAILED]                                  ###\n'
      printf '###                    %s\n' "$p"
      printf '###                    [SAMPLE CODE FAILED BLOCK] (exit code: %s)\n' "$EXITCODE"
      printf '###                                                                          ###\n'
      printf '################################################################################\n'
      printf '################################################################################\n'
      printf '\n\n'

      {
        printf '\n\n'
        printf '################################################################################\n'
        printf '################################################################################\n'
        printf '###                                                                          ###\n'
        printf '###                    [SAMPLE CODE FAILED]                                  ###\n'
        printf '###                    %s\n' "$p"
        printf '###                    [SAMPLE CODE FAILED BLOCK] (exit code: %s)\n' "$EXITCODE"
        printf '###                                                                          ###\n'
        printf '################################################################################\n'
        printf '################################################################################\n'
        printf '\n\n'
      } >> output.log

      FAILCOUNT=$((FAILCOUNT+1))
      FAILED_SAMPLES+=("$p")
    fi
  fi

  SAMPLECOUNT=$((SAMPLECOUNT+1))
done < list.txt
printf '\n\n**** %s Sample Codes ran successfully ****\n' "$FILECOUNT"
printf '\n\n**** %s Sample Codes ran successfully ****\n' "$FILECOUNT" >> output.log
printf '\n\n**** %s Sample Codes FAILED ****\n' "$FAILCOUNT"
printf '\n\n**** %s Sample Codes FAILED ****\n' "$FAILCOUNT" >> output.log
if [ "$FAILCOUNT" -gt 0 ]; then
  printf '\n**** List of FAILED Sample Codes: ****\n'
  printf '\n**** List of FAILED Sample Codes: ****\n' >> output.log
  for failed in "${FAILED_SAMPLES[@]}"; do
    printf '  - %s\n' "$failed"
    printf '  - %s\n' "$failed" >> output.log
  done
fi
rm -f list.txt