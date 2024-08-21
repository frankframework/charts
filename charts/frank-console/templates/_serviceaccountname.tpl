{{/*
Create the name of the service account to use
*/}}
{{- define "frank-console.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "frank-console.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end -}}
