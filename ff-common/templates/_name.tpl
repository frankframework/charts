{{/*
Expand the name of the chart.
*/}}
{{- define "ff-common.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}