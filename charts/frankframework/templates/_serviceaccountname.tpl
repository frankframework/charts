{{/*
Create the name of the service account to use
*/}}
{{- define "frankframework.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "frankframework.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end -}}
