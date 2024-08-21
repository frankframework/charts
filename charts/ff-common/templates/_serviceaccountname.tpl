{{/*
Create the name of the service account to use
*/}}
{{- define "ff-common.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "ff-common.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end -}}
