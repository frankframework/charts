{{/*
Common labels
*/}}
{{- define "ff-common.labels" -}}
helm.sh/chart: {{ include "ff-common.chart" . }}
{{ include "ff-common.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "ff-common.selectorLabels" -}}
app.kubernetes.io/name: {{ include "ff-common.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}